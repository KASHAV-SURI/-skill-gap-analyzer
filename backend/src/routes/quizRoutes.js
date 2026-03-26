const express = require("express");
const {
  startQuiz,
  aiStartQuiz,
  getQuiz,
  submitQuiz,
  getMyHistory,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All quiz routes require authentication
router.use(protect);

router.post("/start",              startQuiz);    // POST /api/quiz/start
router.post("/ai-start",           aiStartQuiz);  // POST /api/quiz/ai-start
router.get("/history",             getMyHistory); // GET  /api/quiz/history  (before :quizId)
router.get("/:quizId",             getQuiz);      // GET  /api/quiz/:quizId
router.post("/:quizId/submit",     submitQuiz);   // POST /api/quiz/:quizId/submit

module.exports = router;
