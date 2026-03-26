/**
 * skillAnalysis.js
 *
 * Central module for all skill-analysis logic.
 * Used by both quizController (on submit) and resultController (on fetch).
 * Keeping this logic in one place means changing thresholds only happens here.
 */

// ─────────────────────────────────────────────────────────────────────────────
// LEVEL THRESHOLDS
//   Advanced    :  >= 75%
//   Intermediate:  45% – 74%
//   Beginner    :  0%  – 44%
// ─────────────────────────────────────────────────────────────────────────────
const LEVELS = {
  ADVANCED: { label: "Advanced", min: 75, color: "#10b981", emoji: "🚀" },
  INTERMEDIATE: { label: "Intermediate", min: 45, color: "#f59e0b", emoji: "📈" },
  BEGINNER: { label: "Beginner", min: 0, color: "#ef4444", emoji: "🌱" },
};

const TOPIC_SEVERITY = {
  CRITICAL: { label: "Critical", threshold: 30, color: "#ef4444" },   // < 30%
  WEAK: { label: "Weak", threshold: 50, color: "#f97316" },           // 30–49%
  MODERATE: { label: "Moderate", threshold: 75, color: "#f59e0b" },   // 50–74%
  STRONG: { label: "Strong", threshold: 100, color: "#10b981" },      // >= 75%
};

// ─────────────────────────────────────────────────────────────────────────────
// getLevel(score) → { label, color, emoji, description }
// ─────────────────────────────────────────────────────────────────────────────
const getLevel = (score) => {
  if (score >= LEVELS.ADVANCED.min) {
    return {
      ...LEVELS.ADVANCED,
      description:
        "Excellent! You have advanced knowledge in this role. Focus on specialisation.",
    };
  }
  if (score >= LEVELS.INTERMEDIATE.min) {
    return {
      ...LEVELS.INTERMEDIATE,
      description:
        "Good foundation. Target your weak topics to reach the advanced level.",
    };
  }
  return {
    ...LEVELS.BEGINNER,
    description:
      "You are at the beginning of your journey. Follow the roadmap to build core skills.",
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// getTopicSeverity(percentage) → severity object
// ─────────────────────────────────────────────────────────────────────────────
const getTopicSeverity = (percentage) => {
  if (percentage < TOPIC_SEVERITY.CRITICAL.threshold) return TOPIC_SEVERITY.CRITICAL;
  if (percentage < TOPIC_SEVERITY.WEAK.threshold) return TOPIC_SEVERITY.WEAK;
  if (percentage < TOPIC_SEVERITY.MODERATE.threshold) return TOPIC_SEVERITY.MODERATE;
  return TOPIC_SEVERITY.STRONG;
};

// ─────────────────────────────────────────────────────────────────────────────
// analyzeTopics(topicBreakdown)
//
// Enriches each topic stat with a severity label and structures them into
// four buckets: critical, weak, moderate, strong.
// ─────────────────────────────────────────────────────────────────────────────
const analyzeTopics = (topicBreakdown) => {
  const enriched = topicBreakdown.map((t) => ({
    ...t,
    severity: getTopicSeverity(t.percentage),
  }));

  return {
    critical: enriched.filter((t) => t.severity.label === "Critical"),
    weak: enriched.filter((t) => t.severity.label === "Weak"),
    moderate: enriched.filter((t) => t.severity.label === "Moderate"),
    strong: enriched.filter((t) => t.severity.label === "Strong"),
    all: enriched,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// buildSkillProfile(results)
//
// Takes an array of Result documents for one user (possibly across multiple
// roles) and returns an aggregated skill profile:
//   - per-role best score, current level, history of attempts
//   - overall average score
//   - total quizzes taken
// ─────────────────────────────────────────────────────────────────────────────
const buildSkillProfile = (results) => {
  const roleMap = {}; // keyed by role._id string

  for (const r of results) {
    const roleId = r.role?._id?.toString() || r.role?.toString();
    const roleName = r.role?.name || "Unknown";
    const roleSlug = r.role?.slug || "";
    const roleIcon = r.role?.icon || "💼";

    if (!roleMap[roleId]) {
      roleMap[roleId] = {
        roleId,
        roleName,
        roleSlug,
        roleIcon,
        attempts: [],
        bestScore: 0,
        latestScore: 0,
        level: "Beginner",
      };
    }

    const entry = roleMap[roleId];
    entry.attempts.push({
      attemptNo: r.attemptNo,
      score: r.score,
      level: r.level,
      weakTopics: r.weakTopics,
      date: r.createdAt,
    });

    if (r.score > entry.bestScore) entry.bestScore = r.score;
  }

  // Sort attempts by attemptNo and set latestScore + level
  for (const entry of Object.values(roleMap)) {
    entry.attempts.sort((a, b) => a.attemptNo - b.attemptNo);
    const latest = entry.attempts[entry.attempts.length - 1];
    entry.latestScore = latest.score;
    entry.level = latest.level;
  }

  const roleProfiles = Object.values(roleMap);
  const totalQuizzes = results.length;
  const overallAvg =
    totalQuizzes > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalQuizzes)
      : 0;

  return {
    totalQuizzes,
    overallAvg,
    overallLevel: getLevel(overallAvg).label,
    roleProfiles,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// getProgressStats(results, roleId)
//
// For a specific role, compare scores across attempts to show improvement.
// Returns: firstScore, latestScore, improvement, trend ("up"/"down"/"stable")
// ─────────────────────────────────────────────────────────────────────────────
const getProgressStats = (results, roleId) => {
  const roleResults = results
    .filter((r) => r.role?._id?.toString() === roleId || r.role?.toString() === roleId)
    .sort((a, b) => a.attemptNo - b.attemptNo);

  if (roleResults.length === 0) {
    return null;
  }

  const firstScore = roleResults[0].score;
  const latestScore = roleResults[roleResults.length - 1].score;
  const improvement = latestScore - firstScore;
  const trend = improvement > 2 ? "up" : improvement < -2 ? "down" : "stable";

  return {
    totalAttempts: roleResults.length,
    firstScore,
    latestScore,
    improvement,
    trend,
    history: roleResults.map((r) => ({
      attemptNo: r.attemptNo,
      score: r.score,
      level: r.level,
      date: r.createdAt,
    })),
  };
};

module.exports = {
  getLevel,
  getTopicSeverity,
  analyzeTopics,
  buildSkillProfile,
  getProgressStats,
  LEVELS,
  TOPIC_SEVERITY,
};
