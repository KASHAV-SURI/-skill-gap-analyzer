const mongoose = require("mongoose");

/*
 * Roadmap — a personalised learning plan generated after quiz results.
 *
 * Fields:
 *   user        — ref to User
 *   result      — ref to Result that triggered this roadmap
 *   role        — ref to Role (for display)
 *   items       — ordered list of topics to learn
 *                 each item has resources (links, type, estimated hours)
 *   overallProgress — 0-100%, updated as user marks steps done
 *   isActive    — only one roadmap per result; old ones get deactivated on retake
 */

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, default: "" },
    type: {
      type: String,
      enum: ["article", "video", "course", "docs", "practice"],
      default: "article",
    },
    estimatedHours: { type: Number, default: 1 },
  },
  { _id: false }
);

const roadmapItemSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    reason: { type: String, default: "" }, // e.g. "Scored 30% in this topic"
    resources: [resourceSchema],
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
  },
  { _id: true }
);

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    items: [roadmapItemSchema],
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);
