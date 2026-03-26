const mongoose = require("mongoose");

/*
 * Result — computed outcome of a completed quiz.
 * Created once when a user submits a quiz.
 *
 * Fields:
 *   user        — ref to User
 *   quiz        — ref to Quiz
 *   role        — ref to Role (denormalised for fast dashboard queries)
 *   totalQ      — total questions in the quiz
 *   correct     — number of correct answers
 *   score       — percentage 0-100
 *   level       — Beginner / Intermediate / Advanced (derived from score)
 *   topicBreakdown — per-topic score used to find weak areas
 *                    [{ topic, total, correct, percentage }]
 *   weakTopics  — topics where percentage < 50%
 *   strongTopics— topics where percentage >= 75%
 *   attemptNo   — which attempt number this is (1st, 2nd retake, ...)
 */

const topicStatSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    total: { type: Number, required: true },
    correct: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    totalQ: { type: Number, required: true },
    correct: { type: Number, required: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    topicBreakdown: [topicStatSchema],
    weakTopics: [String],
    strongTopics: [String],
    attemptNo: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Compound index for admin dashboard: show all results per role, sorted newest first
resultSchema.index({ role: 1, createdAt: -1 });

module.exports = mongoose.model("Result", resultSchema);
