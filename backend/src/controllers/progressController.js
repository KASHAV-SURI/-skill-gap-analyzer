const Result = require("../models/Result");
const Roadmap = require("../models/Roadmap");

const getDateKey = (date) => new Date(date).toISOString().slice(0, 10);

const calcCurrentStreak = (results) => {
  if (!results.length) return 0;

  const uniqueDays = new Set(results.map((r) => getDateKey(r.createdAt)));
  let streak = 0;

  // Include today or yesterday start depending on activity.
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  const todayKey = getDateKey(cursor);
  if (!uniqueDays.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (uniqueDays.has(getDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const computeMilestones = (results, roadmaps, streak) => {
  const defs = [
    {
      id: "first_quiz", title: "First Step",
      desc: "Completed your first quiz", emoji: "🎯",
      check: (r) => r.length >= 1,
    },
    {
      id: "quiz_5", title: "Dedicated Learner",
      desc: "Completed 5 quizzes", emoji: "📚",
      check: (r) => r.length >= 5,
    },
    {
      id: "quiz_10", title: "Quiz Machine",
      desc: "Completed 10 quizzes", emoji: "🏅",
      check: (r) => r.length >= 10,
    },
    {
      id: "score_80", title: "High Achiever",
      desc: "Scored 80%+ on any quiz", emoji: "⭐",
      check: (r) => r.some((x) => x.score >= 80),
    },
    {
      id: "score_100", title: "Perfect Score!",
      desc: "Achieved 100% on a quiz", emoji: "💯",
      check: (r) => r.some((x) => x.score >= 100),
    },
    {
      id: "streak_3", title: "On a Roll",
      desc: "3-day learning streak", emoji: "🔥",
      check: (r, rms, s) => s >= 3,
    },
    {
      id: "streak_7", title: "Fire Starter",
      desc: "7-day learning streak", emoji: "🚀",
      check: (r, rms, s) => s >= 7,
    },
    {
      id: "multi_role", title: "All Rounder",
      desc: "Took quizzes in 3+ different roles", emoji: "🏆",
      check: (r) =>
        new Set(r.map((x) => x.role?._id?.toString() || x.role?.toString())).size >= 3,
    },
    {
      id: "improvement_20", title: "Growing Strong",
      desc: "Improved by 20+ points in any role", emoji: "📈",
      check: (r) => {
        const byRole = {};
        for (const x of r) {
          const rid = x.role?._id?.toString() || x.role?.toString() || "unknown";
          if (!byRole[rid]) byRole[rid] = [];
          byRole[rid].push(x.score);
        }
        return Object.values(byRole).some(
          (scores) => Math.max(...scores) - Math.min(...scores) >= 20
        );
      },
    },
    {
      id: "roadmap_100", title: "Path Cleared",
      desc: "Completed a full learning roadmap", emoji: "🗺️",
      check: (r, rms) => rms.some((rm) => rm.overallProgress >= 100),
    },
  ];

  return defs.map((m) => ({
    id: m.id, title: m.title, desc: m.desc, emoji: m.emoji,
    earned: m.check(results, roadmaps, streak),
  }));
};

// GET /api/progress/overview
// Returns analytics for progress tracking dashboard.
const getProgressOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const [results, roadmaps] = await Promise.all([
      Result.find({ user: userId }).populate("role", "name slug icon").sort({ createdAt: 1 }),
      Roadmap.find({ user: userId, isActive: true }).populate("role", "name slug icon"),
    ]);

    if (results.length === 0) {
      return res.status(200).json({
        success: true,
        overview: {
          totalAttempts: 0,
          avgScore: 0,
          bestScore: 0,
          improvement: 0,
          currentStreak: 0,
          roadmapProgressAvg: 0,
        },
        scoreTrend: [],
        activityHeatmap: [],
        rolePerformance: [],
        levelDistribution: {
          Beginner: 0,
          Intermediate: 0,
          Advanced: 0,
        },
      });
    }

    const totalAttempts = results.length;
    const bestScore = Math.max(...results.map((r) => r.score));
    const avgScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalAttempts);
    const firstScore = results[0].score;
    const latestScore = results[results.length - 1].score;
    const improvement = latestScore - firstScore;

    const currentStreak = calcCurrentStreak(results);

    const roadmapProgressAvg = roadmaps.length
      ? Math.round(
          roadmaps.reduce((sum, r) => sum + (r.overallProgress || 0), 0) / roadmaps.length
        )
      : 0;

    const milestones = computeMilestones(results, roadmaps, currentStreak);

    const scoreTrend = results.slice(-12).map((r) => ({
      date: r.createdAt,
      score: r.score,
      role: r.role?.name || "Unknown",
      level: r.level,
    }));

    const activityMap = new Map();
    for (const r of results) {
      const key = getDateKey(r.createdAt);
      activityMap.set(key, (activityMap.get(key) || 0) + 1);
    }
    const activityHeatmap = [...activityMap.entries()]
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);

    const byRole = new Map();
    for (const r of results) {
      const roleId = r.role?._id?.toString() || "unknown";
      const roleName = r.role?.name || "Unknown";

      if (!byRole.has(roleId)) {
        byRole.set(roleId, {
          roleId,
          roleName,
          attempts: 0,
          avgScore: 0,
          bestScore: 0,
          latestScore: 0,
          firstScore: r.score,
          improvement: 0,
          sumScore: 0,
        });
      }

      const row = byRole.get(roleId);
      row.attempts += 1;
      row.sumScore += r.score;
      row.bestScore = Math.max(row.bestScore, r.score);
      row.latestScore = r.score;
    }

    const rolePerformance = [...byRole.values()]
      .map((row) => {
        const avg = Math.round(row.sumScore / row.attempts);
        const growth = row.latestScore - row.firstScore;
        return {
          roleId: row.roleId,
          roleName: row.roleName,
          attempts: row.attempts,
          avgScore: avg,
          bestScore: row.bestScore,
          latestScore: row.latestScore,
          improvement: growth,
        };
      })
      .sort((a, b) => b.latestScore - a.latestScore);

    const levelDistribution = {
      Beginner: 0,
      Intermediate: 0,
      Advanced: 0,
    };
    for (const r of results) {
      if (levelDistribution[r.level] !== undefined) {
        levelDistribution[r.level] += 1;
      }
    }

    res.status(200).json({
      success: true,
      overview: {
        totalAttempts,
        avgScore,
        bestScore,
        improvement,
        currentStreak,
        roadmapProgressAvg,
      },
      scoreTrend,
      activityHeatmap,
      rolePerformance,
      levelDistribution,
      milestones,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProgressOverview,
};
