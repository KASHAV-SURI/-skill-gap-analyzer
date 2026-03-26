const Roadmap = require("../models/Roadmap");
const Result = require("../models/Result");
const {
  generateRoadmapItems,
  computeOverallProgress,
} = require("../utils/roadmapGenerator");

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/roadmap/generate/:resultId
// @access  Private (owner)
//
// Generates (or re-generates) a personalised roadmap from a quiz result.
// If a roadmap already exists for this result it is replaced.
// ─────────────────────────────────────────────────────────────────────────────
const generateRoadmap = async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId).populate(
      "role",
      "name slug icon"
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Result not found" });
    }

    if (result.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    // Deactivate any previous roadmaps for this result
    await Roadmap.updateMany(
      { user: req.user._id, result: result._id },
      { isActive: false }
    );

    const items = generateRoadmapItems(result.topicBreakdown);

    const roadmap = await Roadmap.create({
      user: req.user._id,
      result: result._id,
      role: result.role._id,
      items,
      overallProgress: 0,
      isActive: true,
    });

    const populated = await Roadmap.findById(roadmap._id).populate(
      "role",
      "name slug icon"
    );

    res.status(201).json({
      success: true,
      message: "Roadmap generated successfully",
      roadmap: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/roadmap/my
// @access  Private (employee)
//
// Returns all active roadmaps for the logged-in user (one per role attempt)
// ─────────────────────────────────────────────────────────────────────────────
const getMyRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      user: req.user._id,
      isActive: true,
    })
      .populate("role", "name slug icon")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: roadmaps.length, roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/roadmap/:roadmapId
// @access  Private (owner or admin)
//
// Returns a single roadmap with all items
// ─────────────────────────────────────────────────────────────────────────────
const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId).populate(
      "role",
      "name slug icon topics"
    );

    if (!roadmap) {
      return res
        .status(404)
        .json({ success: false, message: "Roadmap not found" });
    }

    if (
      roadmap.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/roadmap/:roadmapId/item/:itemId/complete
// @access  Private (owner)
//
// Marks a single roadmap item as completed and recomputes overall progress.
// ─────────────────────────────────────────────────────────────────────────────
const markItemComplete = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId);

    if (!roadmap) {
      return res
        .status(404)
        .json({ success: false, message: "Roadmap not found" });
    }

    if (roadmap.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    const item = roadmap.items.id(req.params.itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in roadmap" });
    }

    item.isCompleted = true;
    item.completedAt = new Date();

    // Recompute overall progress
    roadmap.overallProgress = computeOverallProgress(roadmap.items);

    await roadmap.save();

    res.status(200).json({
      success: true,
      message: `"${item.topic}" marked as complete`,
      overallProgress: roadmap.overallProgress,
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/roadmap/:roadmapId/item/:itemId/undo
// @access  Private (owner)
//
// Un-marks a completed roadmap item and recomputes progress.
// ─────────────────────────────────────────────────────────────────────────────
const undoItemComplete = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.roadmapId);

    if (!roadmap) {
      return res
        .status(404)
        .json({ success: false, message: "Roadmap not found" });
    }

    if (roadmap.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorised" });
    }

    const item = roadmap.items.id(req.params.itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in roadmap" });
    }

    item.isCompleted = false;
    item.completedAt = null;
    roadmap.overallProgress = computeOverallProgress(roadmap.items);

    await roadmap.save();

    res.status(200).json({
      success: true,
      message: `"${item.topic}" marked as incomplete`,
      overallProgress: roadmap.overallProgress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateRoadmap,
  getMyRoadmaps,
  getRoadmapById,
  markItemComplete,
  undoItemComplete,
};
