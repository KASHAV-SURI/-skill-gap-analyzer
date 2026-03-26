const mongoose = require("mongoose");

/*
 * Role — represents a job role (e.g. "Frontend Developer").
 * Admin can add new roles without touching code (scalable design).
 *
 * Fields:
 *   name        — display name shown in UI
 *   slug        — URL-safe unique key, e.g. "frontend-developer"
 *   description — short description shown on role selection screen
 *   icon        — emoji or icon name for UI
 *   topics      — array of skill topics belonging to this role
 *                 (used for weak-area analysis and roadmap generation)
 *   isActive    — soft-disable a role without deleting it
 */

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "💼",
    },
    topics: [
      {
        name: { type: String, required: true },   // e.g. "React Hooks"
        category: { type: String, default: "" },  // e.g. "Frontend"
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
