/**
 * roadmapGenerator.js
 *
 * Generates a personalised Roadmap document from a Result.
 *
 * Priority logic:
 *   Critical topics (< 30%)   → high priority
 *   Weak topics    (30–49%)   → high priority
 *   Moderate topics (50–74%)  → medium priority
 *   Strong topics  (≥ 75%)    → low priority (maintenance)
 *
 * Order: critical → weak → moderate → strong
 */

const { getResourcesForTopic } = require("./roadmapData");
const { getTopicSeverity } = require("./skillAnalysis");

/**
 * getPriority(percentage) → "high" | "medium" | "low"
 */
const getPriority = (percentage) => {
  if (percentage < 50) return "high";
  if (percentage < 75) return "medium";
  return "low";
};

/**
 * buildReason(topic, percentage, severity) → human-readable string
 */
const buildReason = (topic, percentage, severity) => {
  if (severity === "Critical")
    return `You scored only ${percentage}% in ${topic}. This is a critical gap — prioritise this immediately.`;
  if (severity === "Weak")
    return `You scored ${percentage}% in ${topic}. This is below average and needs focused improvement.`;
  if (severity === "Moderate")
    return `You scored ${percentage}% in ${topic}. You have a basic understanding — level it up to become proficient.`;
  return `You scored ${percentage}% in ${topic}. You are strong here — keep this skill sharp.`;
};

/**
 * generateRoadmapItems(topicBreakdown)
 *
 * Takes the topicBreakdown array from a Result and returns
 * an ordered array of roadmap items ready to insert into MongoDB.
 */
const generateRoadmapItems = (topicBreakdown) => {
  // Sort: critical first, then weak, then moderate, then strong
  const ORDER = { Critical: 0, Weak: 1, Moderate: 2, Strong: 3 };

  const sorted = [...topicBreakdown].sort((a, b) => {
    const sa = getTopicSeverity(a.percentage).label;
    const sb = getTopicSeverity(b.percentage).label;
    return ORDER[sa] - ORDER[sb];
  });

  return sorted.map((stat) => {
    const severity = getTopicSeverity(stat.percentage).label;
    const priority = getPriority(stat.percentage);
    const reason = buildReason(stat.topic, stat.percentage, severity);
    const resources = getResourcesForTopic(stat.topic);

    return {
      topic: stat.topic,
      priority,
      reason,
      resources,
      isCompleted: false,
      completedAt: null,
    };
  });
};

/**
 * computeOverallProgress(items)
 *
 * Returns overall progress percentage (0-100) based on completed items.
 * Weights high-priority items more heavily.
 */
const computeOverallProgress = (items) => {
  if (!items || items.length === 0) return 0;

  const weights = { high: 3, medium: 2, low: 1 };
  let totalWeight = 0;
  let completedWeight = 0;

  for (const item of items) {
    const w = weights[item.priority] || 1;
    totalWeight += w;
    if (item.isCompleted) completedWeight += w;
  }

  return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
};

module.exports = { generateRoadmapItems, computeOverallProgress };
