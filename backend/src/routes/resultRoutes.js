const express = require("express");
const {
  getMyResults,
  getResultById,
  getSkillProfile,
  getProgressByRole,
} = require("../controllers/resultController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

// Order matters — specific paths before :param paths
router.get("/my", getMyResults);                    // GET /api/results/my
router.get("/skill-profile", getSkillProfile);      // GET /api/results/skill-profile
router.get("/progress/:roleId", getProgressByRole); // GET /api/results/progress/:roleId
router.get("/:resultId", getResultById);            // GET /api/results/:resultId

module.exports = router;
