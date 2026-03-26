const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const adminRoutes = require("./routes/adminRoutes");
const progressRoutes = require("./routes/progressRoutes");

dotenv.config();

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin and non-browser requests.
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: origin not allowed"));
    },
    credentials: true,
  })
);
app.use(express.json());

// ── Routes ────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/progress", progressRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillGap backend is running",
    dbState: app.locals.dbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend static build in production mode.
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return res.status(404).end();
    return res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbConnected = await connectDB();
  app.locals.dbConnected = dbConnected;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
