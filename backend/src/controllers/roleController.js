const Role = require("../models/Role");

// ─────────────────────────────────────────────────────────────
// @route   GET /api/roles
// @access  Public
// Returns all active roles for the role-selection screen
// ─────────────────────────────────────────────────────────────
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isActive: true }).select(
      "name slug description icon topics"
    );
    res.status(200).json({ success: true, count: roles.length, roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// @route   GET /api/roles/:slug
// @access  Public
// Returns a single role with all its topics
// ─────────────────────────────────────────────────────────────
const getRoleBySlug = async (req, res) => {
  try {
    const role = await Role.findOne({ slug: req.params.slug, isActive: true });
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    res.status(200).json({ success: true, role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllRoles, getRoleBySlug };
