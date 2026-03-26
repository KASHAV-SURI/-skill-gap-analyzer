const express = require("express");
const {
  getAdminOverview,
  getAllUsers,
  updateUserActiveState,
  updateUserRole,
} = require("../controllers/adminController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.get("/overview", getAdminOverview);
router.get("/users", getAllUsers);
router.patch("/users/:userId/active", updateUserActiveState);
router.patch("/users/:userId/role", updateUserRole);

module.exports = router;
