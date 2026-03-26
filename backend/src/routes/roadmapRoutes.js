const express = require("express");
const {
  generateRoadmap,
  getMyRoadmaps,
  getRoadmapById,
  markItemComplete,
  undoItemComplete,
} = require("../controllers/roadmapController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/generate/:resultId", generateRoadmap);             // POST /api/roadmap/generate/:resultId
router.get("/my", getMyRoadmaps);                                // GET  /api/roadmap/my
router.get("/:roadmapId", getRoadmapById);                       // GET  /api/roadmap/:roadmapId
router.patch("/:roadmapId/item/:itemId/complete", markItemComplete); // PATCH /api/roadmap/:id/item/:id/complete
router.patch("/:roadmapId/item/:itemId/undo", undoItemComplete);     // PATCH /api/roadmap/:id/item/:id/undo

module.exports = router;
