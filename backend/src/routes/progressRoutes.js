const express = require("express");
const { getProgressOverview } = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/overview", getProgressOverview);

module.exports = router;
