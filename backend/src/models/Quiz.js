const mongoose = require("mongoose");

/*
 * Quiz — one quiz session taken by a user.
 *
 * Lifecycle:  in-progress → completed
 *
 * Fields:
 *   user        — who is taking the quiz
 *   role        — which job role the quiz is for
 *   difficulty  — easy / medium / hard (chosen or auto-assigned)
 *   questions   — ordered list of question IDs served to the user
 *   answers     — user's submitted answers, keyed by question index
 *                 { questionId, selectedOption, isCorrect }
 *   status      — in-progress while answering, completed when submitted
 *   startedAt   — when the quiz session began
 *   completedAt — when the quiz was submitted
 */

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedOption: {
          type: Number, // index 0-3
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
        topic: {
          type: String, // stored for fast weak-area analysis
        },
      },
    ],
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
