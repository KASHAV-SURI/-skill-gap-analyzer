import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp, ExternalLink,
  Map, Clock, BookOpen, AlertTriangle, TrendingUp, Star,
} from "lucide-react";

const PHASES = [
  {
    key: "high",
    label: "Critical Gaps — Fix These First",
    subtitle: "You scored low on these topics. Prioritise them to close skill gaps fast.",
    Icon: AlertTriangle,
    headerClass: "bg-red-500/10 border border-red-500/30",
    iconClass: "text-red-400",
    badgeClass: "bg-red-500/15 text-red-300 border-red-500/30",
    numClass: "bg-red-500/20 text-red-300 border-2 border-red-500/40",
    lineClass: "bg-red-500/25",
    tagLabel: "🔴 Critical",
  },
  {
    key: "medium",
    label: "Level Up — Improve Your Skills",
    subtitle: "You have a basic understanding. Push these to proficient to stand out.",
    Icon: TrendingUp,
    headerClass: "bg-yellow-500/10 border border-yellow-500/30",
    iconClass: "text-yellow-400",
    badgeClass: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    numClass: "bg-yellow-500/20 text-yellow-300 border-2 border-yellow-500/40",
    lineClass: "bg-yellow-500/25",
    tagLabel: "🟡 Improve",
  },
  {
    key: "low",
    label: "Maintain Strengths",
    subtitle: "You're already strong here. Keep these skills sharp with regular practice.",
    Icon: Star,
    headerClass: "bg-green-500/10 border border-green-500/30",
    iconClass: "text-green-400",
    badgeClass: "bg-green-500/15 text-green-300 border-green-500/30",
    numClass: "bg-green-500/20 text-green-300 border-2 border-green-500/40",
    lineClass: "bg-green-500/25",
    tagLabel: "🟢 Maintain",
  },
];

const typeIcon  = { video: "▶", course: "🎓", article: "📄", docs: "📖", practice: "🧑‍💻" };
const typeBadge = {
  video:    "bg-red-500/15 text-red-300",
  course:   "bg-blue-500/15 text-blue-300",
  article:  "bg-slate-500/15 text-slate-300",
  docs:     "bg-cyan-500/15 text-cyan-300",
  practice: "bg-green-500/15 text-green-300",
};

const RoadmapPage = () => {
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    const endpoint = roadmapId ? `/roadmap/${roadmapId}` : "/roadmap/my";
    api.get(endpoint)
      .then(({ data }) => {
        setRoadmap(data.roadmap ?? data.roadmaps?.[0] ?? null);
      })
      .catch(() => toast.error("Failed to load roadmap"))
      .finally(() => setLoading(false));
  }, [roadmapId]);

  const toggleComplete = async (itemId, isCompleted) => {
    setToggling(itemId);
    const endpoint = isCompleted
      ? `/roadmap/${roadmap._id}/item/${itemId}/undo`
      : `/roadmap/${roadmap._id}/item/${itemId}/complete`;
    try {
      const { data } = await api.patch(endpoint);
      setRoadmap((prev) => ({
        ...prev,
        overallProgress: data.overallProgress,
        items: prev.items.map((item) =>
          item._id === itemId
            ? { ...item, isCompleted: !isCompleted, completedAt: !isCompleted ? new Date().toISOString() : null }
            : item
        ),
      }));
      toast.success(data.message);
    } catch {
      toast.error("Could not update item");
    } finally {
      setToggling(null);
    }
  };

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Map size={40} className="text-slate-600" />
        <p className="text-slate-400 text-lg">No roadmap found.</p>
        <Link to="/roles" className="btn-primary">Take a Quiz First</Link>
      </div>
    );
  }

  const completedCount = roadmap.items.filter((i) => i.isCompleted).length;
  const totalHours = roadmap.items.reduce(
    (sum, item) => sum + (item.resources?.reduce((s, r) => s + (r.estimatedHours || 0), 0) || 0),
    0
  );

  // Group by priority
  const grouped = { high: [], medium: [], low: [] };
  roadmap.items.forEach((item) => { if (grouped[item.priority]) grouped[item.priority].push(item); });

  // Assign global step numbers across all phases
  let counter = 0;
  const stepNum = {};
  ["high", "medium", "low"].forEach((key) => {
    grouped[key].forEach((item) => { counter++; stepNum[item._id] = counter; });
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">

      {/* ── Header card ─────────────────────────────── */}
      <div className="glass p-6">
        <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-1">Personalised Learning Roadmap</p>
        <h1 className="text-3xl font-bold text-white mb-0.5">{roadmap.role?.name}</h1>
        <p className="text-slate-400 text-sm mb-5">Generated from your quiz results — work through each step to close your skill gaps.</p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mb-5">
          {[
            { label: "Topics Total", value: roadmap.items.length },
            { label: "Completed", value: completedCount },
            { label: "Remaining", value: roadmap.items.length - completedCount },
            { label: "Est. Hours", value: `~${totalHours}h` },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 min-w-[80px] glass bg-white/5 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Overall Progress</span>
            <span className="font-semibold text-white">{roadmap.overallProgress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              animate={{ width: `${roadmap.overallProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100% 🎯</span>
          </div>
        </div>
      </div>

      {/* ── Phase sections ───────────────────────────── */}
      {PHASES.map((phase) => {
        const items = grouped[phase.key];
        if (items.length === 0) return null;
        const { Icon } = phase;
        const phaseDone = items.filter((i) => i.isCompleted).length;

        return (
          <div key={phase.key} className="flex flex-col gap-0">
            {/* Phase header */}
            <div className={`flex items-center justify-between px-5 py-4 rounded-xl mb-3 ${phase.headerClass}`}>
              <div className="flex items-center gap-3">
                <Icon size={22} className={phase.iconClass} />
                <div>
                  <h2 className="font-bold text-white text-base">{phase.label}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{phase.subtitle}</p>
                </div>
              </div>
              <span className={`shrink-0 text-sm font-medium px-3 py-1 rounded-full border ${phase.badgeClass}`}>
                {phaseDone}/{items.length}
              </span>
            </div>

            {/* Step items */}
            <div className="flex flex-col pl-3">
              {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                const isExp = !!expanded[item._id];
                const hours = item.resources?.reduce((s, r) => s + (r.estimatedHours || 0), 0) || 0;

                return (
                  <div key={item._id} className="flex gap-4">
                    {/* Timeline column */}
                    <div className="flex flex-col items-center" style={{ width: 36 }}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                        item.isCompleted
                          ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
                          : phase.numClass
                      }`}>
                        {item.isCompleted ? <CheckCircle2 size={16} /> : stepNum[item._id]}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[20px] mt-1 mb-1 ${item.isCompleted ? "bg-green-500/30" : phase.lineClass}`} />
                      )}
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex-1 glass overflow-hidden mb-3 transition-opacity ${item.isCompleted ? "opacity-55" : ""}`}
                    >
                      {/* Card body */}
                      <div className="p-4">
                        {/* Topic title + badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className={`text-base font-bold text-white ${item.isCompleted ? "line-through text-slate-500" : ""}`}>
                            {item.topic}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${phase.badgeClass}`}>
                            {phase.tagLabel}
                          </span>
                          {hours > 0 && (
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={10} /> ~{hours}h
                            </span>
                          )}
                        </div>

                        {/* Reason / description */}
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.reason}</p>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => toggleComplete(item._id, item.isCompleted)}
                            disabled={toggling === item._id}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                              item.isCompleted
                                ? "bg-green-500/15 text-green-400 border-green-500/30 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30"
                                : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40"
                            }`}
                          >
                            {toggling === item._id ? (
                              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : item.isCompleted ? (
                              <><CheckCircle2 size={14} /> Completed — Undo?</>
                            ) : (
                              <><Circle size={14} /> Mark as Complete</>
                            )}
                          </button>

                          {item.resources?.length > 0 && (
                            <button
                              onClick={() => toggleExpand(item._id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                            >
                              <BookOpen size={14} />
                              {item.resources.length} Resources
                              {isExp ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Resources panel */}
                      <AnimatePresence>
                        {isExp && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-white/5 px-4 pb-4 pt-3"
                          >
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
                              📚 Learning Resources
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.resources.map((res, ri) => (
                                <a
                                  key={ri}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 transition-all group"
                                >
                                  <span className="text-lg mt-0.5 shrink-0">{typeIcon[res.type] ?? "🔗"}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white group-hover:text-blue-300 transition-colors leading-snug mb-1.5">
                                      {res.title}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium capitalize ${typeBadge[res.type] || "bg-slate-500/15 text-slate-300"}`}>
                                        {res.type}
                                      </span>
                                      <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock size={9} /> ~{res.estimatedHours}h
                                      </span>
                                    </div>
                                  </div>
                                  <ExternalLink size={13} className="text-slate-600 group-hover:text-blue-400 shrink-0 mt-0.5" />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ── All done celebration ─────────────────────── */}
      {completedCount === roadmap.items.length && roadmap.items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 text-center border border-green-500/30 bg-green-500/5"
        >
          <p className="text-5xl mb-3">🎉</p>
          <h3 className="text-2xl font-bold text-white">Roadmap Complete!</h3>
          <p className="text-slate-400 mt-1 text-sm">
            Outstanding work — you have completed all topics for <span className="text-white font-medium">{roadmap.role?.name}</span>.
          </p>
        </motion.div>
      )}

      <Link to="/dashboard" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 w-fit">
        ← Back to Dashboard
      </Link>
    </motion.div>
  );
};

export default RoadmapPage;
