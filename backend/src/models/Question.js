const mongoose = require("mongoose");

/*
 * Question — a single quiz question linked to a Role and a topic.
 *
 * Fields:
 *   role        — ref to Role._id (which role this question belongs to)
 *   topic       — skill topic within the role, e.g. "CSS Flexbox"
 *   difficulty  — easy / medium / hard
 *   text        — the question text
 *   options     — array of 4 answer choices
 *   answer      — index (0-3) of the correct option in options[]
 *   explanation — optional explanation shown after answering
 *   isActive    — soft-disable without deleting
 */

const questionSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "Role reference is required"],
      index: true,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: (v) => v.length === 4,
        message: "Each question must have exactly 4 options",
      },
      required: true,
    },
    answer: {
      type: Number,          // index 0-3 pointing to correct option
      min: 0,
      max: 3,
      required: true,
      select: false,         // never expose correct answer in list queries
    },
    explanation: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAI: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index: fast fetch of questions by role + difficulty
questionSchema.index({ role: 1, difficulty: 1 });

module.exports = mongoose.model("Question", questionSchema);
