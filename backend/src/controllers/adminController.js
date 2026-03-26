const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");
const Role = require("../models/Role");

// GET /api/admin/overview
// Returns high-level platform metrics for admin dashboard.
const getAdminOverview = async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalEmployees,
      totalAdmins,
      totalRoles,
      activeRoles,
      totalQuizzes,
      completedQuizzes,
      totalResults,
      avgScoreRaw,
      latestResults,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ role: "employee" }),
      User.countDocuments({ role: "admin" }),
      Role.countDocuments(),
      Role.countDocuments({ isActive: true }),
      Quiz.countDocuments(),
      Quiz.countDocuments({ status: "completed" }),
      Result.countDocuments(),
      Result.aggregate([
        { $group: { _id: null, avgScore: { $avg: "$score" } } },
      ]),
      Result.find()
        .populate("user", "name email")
        .populate("role", "name slug")
        .sort({ createdAt: -1 })
        .limit(8),
    ]);

    const avgScore = avgScoreRaw[0]?.avgScore
      ? Math.round(avgScoreRaw[0].avgScore)
      : 0;

    res.status(200).json({
      success: true,
      overview: {
        users: {
          total: totalUsers,
          active: activeUsers,
          employees: totalEmployees,
          admins: totalAdmins,
        },
        roles: {
          total: totalRoles,
          active: activeRoles,
        },
        quizzes: {
          total: totalQuizzes,
          completed: completedQuizzes,
        },
        results: {
          total: totalResults,
          avgScore,
        },
      },
      latestResults,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/users
// List users with role/activity filters and pagination.
const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "12", 10), 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.isActive === "true") filter.isActive = true;
    if (req.query.isActive === "false") filter.isActive = false;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("name email role jobRole department isActive createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      page,
      total,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/admin/users/:userId/active
// Activate/deactivate user account.
const updateUserActiveState = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    // Prevent admin from deactivating themselves accidentally.
    if (req.user._id.toString() === userId && isActive === false) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true, runValidators: true }
    ).select("name email role jobRole department isActive createdAt");

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/admin/users/:userId/role
// Promote/demote user role (employee/admin).
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["employee", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "role must be either employee or admin",
      });
    }

    // Prevent self-demotion from admin to employee.
    if (req.user._id.toString() === userId && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own admin role",
      });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select("name email role jobRole department isActive createdAt");

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAdminOverview,
  getAllUsers,
  updateUserActiveState,
  updateUserRole,
};
