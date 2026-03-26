const Result = require("../models/Result");
const {
  analyzeTopics,
  buildSkillProfile,
  getProgressStats,
  getLevel,
} = require("../utils/skillAnalysis");

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/results/my
// @access  Private (employee — own results)
// Returns all results for the logged-in user, newest first
// ─────────────────────────────────────────────────────────────────────────────
const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .populate("role", "name slug icon")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/results/:resultId
// @access  Private (owner or admin)
// Returns a single result with enriched topic analysis
// ─────────────────────────────────────────────────────────────────────────────
const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId)
      .populate("role", "name slug icon topics")
      .populate("quiz", "difficulty startedAt completedAt");

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });
    }

    // Only the owner or admin can view
    if (
      result.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    const topicAnalysis = analyzeTopics(result.topicBreakdown);
    const levelInfo = getLevel(result.score);

    res.status(200).json({
      success: true,
      result: {
        ...result.toObject(),
        levelInfo,
        topicAnalysis,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/results/skill-profile
// @access  Private (employee — own profile)
// Aggregates all results across all roles into one skill profile
// ─────────────────────────────────────────────────────────────────────────────
const getSkillProfile = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .populate("role", "name slug icon")
      .sort({ createdAt: 1 }); // oldest first for progress calculation

    const profile = buildSkillProfile(results);

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/results/progress/:roleId
// @access  Private (owner)
// Shows improvement stats for a specific role across multiple attempts
// ─────────────────────────────────────────────────────────────────────────────
const getProgressByRole = async (req, res) => {
  try {
    const results = await Result.find({
      user: req.user._id,
      role: req.params.roleId,
    })
      .populate("role", "name slug icon")
      .sort({ attemptNo: 1 });

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found for this role",
      });
    }

    const stats = getProgressStats(results, req.params.roleId);

    // Attach enriched topic analysis to the latest result
    const latest = results[results.length - 1];
    const topicAnalysis = analyzeTopics(latest.topicBreakdown);
    const levelInfo = getLevel(latest.score);

    res.status(200).json({
      success: true,
      progress: {
        ...stats,
        latestResult: {
          ...latest.toObject(),
          levelInfo,
          topicAnalysis,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMyResults,
  getResultById,
  getSkillProfile,
  getProgressByRole,
};
