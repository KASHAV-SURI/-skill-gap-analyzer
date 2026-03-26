const mongoose = require("mongoose");
const Role = require("../models/Role");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");
const { getLevel } = require("../utils/skillAnalysis");
const { generateAIQuestions } = require("../utils/openrouterClient");

const QUESTIONS_PER_QUIZ = 5;

// Helper: resolve role from either roleId or roleSlug
const resolveRole = async (roleId, roleSlug) => {
  if (roleId && mongoose.Types.ObjectId.isValid(roleId)) {
    return Role.findById(roleId);
  }
  if (roleSlug) {
    return Role.findOne({ slug: roleSlug, isActive: true });
  }
  return null;
};

// POST /api/quiz/start — standard quiz with DB questions
const startQuiz = async (req, res) => {
  try {
    const { roleId, roleSlug, difficulty } = req.body;

    if (!difficulty) {
      return res.status(400).json({ success: false, message: "difficulty is required" });
    }
    if (!["easy", "medium", "hard"].includes(difficulty)) {
      return res.status(400).json({ success: false, message: "difficulty must be easy, medium, or hard" });
    }

    const role = await resolveRole(roleId, roleSlug);
    if (!role || !role.isActive) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    // Fetch all active questions for this role + difficulty, then pick random subset
    const allQuestions = await Question.find({
      role: role._id,
      difficulty,
      isActive: true,
    }).select("-answer -__v");

    if (allQuestions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No ${difficulty} questions found for ${role.name}`,
      });
    }

    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, QUESTIONS_PER_QUIZ);

    const quiz = await Quiz.create({
      user: req.user._id,
      role: role._id,
      difficulty,
      questions: selected.map((q) => q._id),
      status: "in-progress",
    });

    res.status(201).json({
      success: true,
      message: "Quiz started",
      quiz: {
        quizId: quiz._id,
        role: { id: role._id, name: role.name, slug: role.slug },
        difficulty,
        totalQuestions: selected.length,
        questions: selected,
        isAI: false,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/quiz/ai-start — AI-generated quiz via OpenRouter
const aiStartQuiz = async (req, res) => {
  try {
    const { roleId, roleSlug, useAdaptive, difficulty: reqDifficulty } = req.body;

    const role = await resolveRole(roleId, roleSlug);
    if (!role || !role.isActive) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(503).json({
        success: false,
        message: "AI quiz is not configured. Please add your OPENROUTER_API_KEY in backend/.env",
      });
    }

    // Adaptive difficulty: auto-pick based on user's last result for this role
    let difficulty = reqDifficulty || "medium";
    if (useAdaptive) {
      const lastResult = await Result.findOne({
        user: req.user._id,
        role: role._id,
      }).sort({ createdAt: -1 });
      if (lastResult) {
        if (lastResult.score >= 75) difficulty = "hard";
        else if (lastResult.score < 45) difficulty = "easy";
        else difficulty = "medium";
      } else {
        difficulty = "medium"; // First attempt: start at medium
      }
    }
    if (!["easy", "medium", "hard"].includes(difficulty)) difficulty = "medium";

    // Generate questions via OpenRouter
    const rawQuestions = await generateAIQuestions(
      role.name,
      role.topics || [],
      difficulty,
      QUESTIONS_PER_QUIZ
    );

    // Persist AI questions as Question documents (answer stored securely)
    const questionDocs = await Question.insertMany(
      rawQuestions.map((q) => ({
        role: role._id,
        topic: q.topic,
        difficulty,
        text: q.question,
        options: q.options,
        answer: q.answer,
        isAI: true,
        isActive: true,
      }))
    );

    const quiz = await Quiz.create({
      user: req.user._id,
      role: role._id,
      difficulty,
      questions: questionDocs.map((q) => q._id),
      status: "in-progress",
    });

    // Return questions without answer field
    const safeQuestions = questionDocs.map((q) => ({
      _id: q._id,
      topic: q.topic,
      text: q.text,
      options: q.options,
      difficulty: q.difficulty,
    }));

    res.status(201).json({
      success: true,
      message: "AI quiz started",
      quiz: {
        quizId: quiz._id,
        role: { id: role._id, name: role.name, slug: role.slug },
        difficulty,
        totalQuestions: safeQuestions.length,
        questions: safeQuestions,
        isAI: true,
        adaptiveDifficulty: useAdaptive ? difficulty : null,
      },
    });
  } catch (error) {
    if (
      error.message?.includes("OpenRouter") ||
      error.message?.includes("OPENROUTER") ||
      error.message?.includes("AI") ||
      error.message?.includes("parse")
    ) {
      return res.status(503).json({
        success: false,
        message: "AI quiz generation failed. Try a standard quiz instead.",
        detail: error.message,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// @route   GET /api/quiz/:quizId
// @access  Private (owner)
// Returns quiz status and answered questions so far
// ─────────────────────────────────────────────────────────────
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId)
      .populate("role", "name slug icon")
      .populate("questions", "-answer");

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // Only the quiz owner (or admin) can view
    if (
      quiz.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// @route   POST /api/quiz/:quizId/submit
// @access  Private (owner)
// Body: { answers: [{ questionId, selectedOption }] }
//
// 1. Validates all answers
// 2. Fetches correct answers from DB
// 3. Calculates total score + per-topic breakdown
// 4. Determines level (Beginner / Intermediate / Advanced)
// 5. Saves Result  →  updates Quiz status to "completed"
// ─────────────────────────────────────────────────────────────
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "answers array is required" });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    if (quiz.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    if (quiz.status === "completed") {
      return res
        .status(400)
        .json({ success: false, message: "Quiz already submitted" });
    }

    // Fetch the correct answers for all questions in this quiz
    // (answer field is selected explicitly here — only on submission)
    const questions = await Question.find({
      _id: { $in: quiz.questions },
    }).select("+answer");

    // Map questionId → { correctAnswer, topic }
    const questionMap = {};
    for (const q of questions) {
      questionMap[q._id.toString()] = {
        correctAnswer: q.answer,
        topic: q.topic,
      };
    }

    // Grade each submitted answer
    let correctCount = 0;
    const gradedAnswers = [];
    const topicMap = {}; // { topic: { total, correct } }

    for (const submission of answers) {
      const { questionId, selectedOption } = submission;
      const qData = questionMap[questionId?.toString()];

      if (!qData) continue; // skip unknown question IDs

      const isCorrect = Number(selectedOption) === qData.correctAnswer;
      if (isCorrect) correctCount++;

      gradedAnswers.push({
        questionId,
        selectedOption: Number(selectedOption),
        isCorrect,
        correctAnswer: qData.correctAnswer,
        topic: qData.topic,
      });

      // Accumulate per-topic stats
      if (!topicMap[qData.topic]) {
        topicMap[qData.topic] = { total: 0, correct: 0 };
      }
      topicMap[qData.topic].total++;
      if (isCorrect) topicMap[qData.topic].correct++;
    }

    const totalQ = gradedAnswers.length;
    const score = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
    const level = getLevel(score).label;

    // Build topic breakdown array
    const topicBreakdown = Object.entries(topicMap).map(([topic, stats]) => ({
      topic,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100),
    }));

    const weakTopics = topicBreakdown
      .filter((t) => t.percentage < 50)
      .map((t) => t.topic);

    const strongTopics = topicBreakdown
      .filter((t) => t.percentage >= 75)
      .map((t) => t.topic);

    // Count how many times this user has attempted this role
    const previousAttempts = await Result.countDocuments({
      user: req.user._id,
      role: quiz.role,
    });

    // Save Result
    const result = await Result.create({
      user: req.user._id,
      quiz: quiz._id,
      role: quiz.role,
      totalQ,
      correct: correctCount,
      score,
      level,
      topicBreakdown,
      weakTopics,
      strongTopics,
      attemptNo: previousAttempts + 1,
    });

    // Mark quiz as completed
    quiz.status = "completed";
    quiz.answers = gradedAnswers;
    quiz.completedAt = new Date();
    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      gradedAnswers,
      result: {
        resultId: result._id,
        _id: result._id,       // alias for frontend compatibility
        score,
        level,
        correct: correctCount,
        totalQ,
        topicBreakdown,
        weakTopics,
        strongTopics,
        attemptNo: result.attemptNo,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/quiz/history
const getMyHistory = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .populate("role", "name slug icon")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { startQuiz, aiStartQuiz, getQuiz, submitQuiz, getMyHistory };
