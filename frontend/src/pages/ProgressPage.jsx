import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Activity,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  ChartNoAxesCombined,
  Medal,
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, hint }) => (
  <div className="glass p-5">
    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
      <Icon size={14} /> {label}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {hint ? <p className="text-xs text-slate-500 mt-1">{hint}</p> : null}
  </div>
);

const levelColor = {
  Beginner: "bg-red-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-emerald-500",
};

const ProgressPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/progress/overview")
      .then(({ data: res }) => setData(res))
      .catch(() => toast.error("Failed to load progress analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { overview, scoreTrend, activityHeatmap, rolePerformance, levelDistribution, milestones } = data;
  const maxScore = Math.max(100, ...scoreTrend.map((x) => x.score));
  const maxActivity = Math.max(1, ...activityHeatmap.map((x) => x.count));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Progress Analytics</h1>
        <p className="text-sm text-slate-400 mt-1">Track learning momentum, role-wise growth, and consistency over time.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Activity} label="Total Attempts" value={overview.totalAttempts} />
        <StatCard icon={Target} label="Average Score" value={`${overview.avgScore}%`} />
        <StatCard icon={Trophy} label="Best Score" value={`${overview.bestScore}%`} />
        <StatCard
          icon={TrendingUp}
          label="Net Improvement"
          value={`${overview.improvement > 0 ? "+" : ""}${overview.improvement}%`}
          hint="Latest vs first attempt"
        />
        <StatCard icon={Flame} label="Current Streak" value={`${overview.currentStreak} day${overview.currentStreak === 1 ? "" : "s"}`} />
        <StatCard icon={ChartNoAxesCombined} label="Roadmap Progress Avg" value={`${overview.roadmapProgressAvg}%`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-5">
          <h2 className="text-white font-semibold mb-3">Score Trend (Last 12 attempts)</h2>
          {scoreTrend.length === 0 ? (
            <p className="text-sm text-slate-500">No attempt data yet.</p>
          ) : (
            <div className="space-y-2">
              {scoreTrend.map((pt, idx) => (
                <div key={`${pt.date}-${idx}`}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{new Date(pt.date).toLocaleDateString()} · {pt.role}</span>
                    <span className="text-white font-medium">{pt.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                      style={{ width: `${(pt.score / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass p-5">
          <h2 className="text-white font-semibold mb-3">Learning Activity (Last 30 days)</h2>
          {activityHeatmap.length === 0 ? (
            <p className="text-sm text-slate-500">No recent activity yet.</p>
          ) : (
            <div className="grid grid-cols-10 gap-1.5">
              {activityHeatmap.map((cell) => {
                const intensity = cell.count / maxActivity;
                const opacity = 0.2 + intensity * 0.8;
                return (
                  <div
                    key={cell.date}
                    title={`${cell.date}: ${cell.count} attempt${cell.count === 1 ? "" : "s"}`}
                    className="aspect-square rounded"
                    style={{ backgroundColor: `rgba(99, 102, 241, ${opacity.toFixed(2)})` }}
                  />
                );
              })}
            </div>
          )}
          <p className="text-xs text-slate-500 mt-3">Darker cells indicate more quiz activity.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-5 overflow-x-auto">
          <h2 className="text-white font-semibold mb-3">Role-wise Performance</h2>
          {rolePerformance.length === 0 ? (
            <p className="text-sm text-slate-500">No role analytics yet.</p>
          ) : (
            <table className="w-full text-sm min-w-[540px]">
              <thead>
                <tr className="text-left text-slate-400 border-b border-white/10">
                  <th className="py-2 pr-2 font-medium">Role</th>
                  <th className="py-2 pr-2 font-medium">Attempts</th>
                  <th className="py-2 pr-2 font-medium">Avg</th>
                  <th className="py-2 pr-2 font-medium">Best</th>
                  <th className="py-2 pr-2 font-medium">Latest</th>
                  <th className="py-2 pr-2 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {rolePerformance.map((r) => (
                  <tr key={r.roleId} className="border-b border-white/5 last:border-0">
                    <td className="py-2 pr-2 text-white">{r.roleName}</td>
                    <td className="py-2 pr-2 text-slate-300">{r.attempts}</td>
                    <td className="py-2 pr-2 text-slate-300">{r.avgScore}%</td>
                    <td className="py-2 pr-2 text-slate-300">{r.bestScore}%</td>
                    <td className="py-2 pr-2 text-slate-300">{r.latestScore}%</td>
                    <td className={`py-2 pr-2 font-medium ${r.improvement >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {r.improvement >= 0 ? "+" : ""}{r.improvement}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="glass p-5">
          <h2 className="text-white font-semibold mb-3">Level Distribution</h2>
          <div className="space-y-3">
            {Object.entries(levelDistribution).map(([level, count]) => (
              <div key={level}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{level}</span>
                  <span className="text-white">{count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${levelColor[level] || "bg-slate-500"}`}
                    style={{
                      width: `${overview.totalAttempts ? (count / overview.totalAttempts) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Achievements / Milestones ─────────────────── */}
      {milestones && milestones.length > 0 && (
        <div className="glass p-5">
          <div className="flex items-center gap-2 mb-4">
            <Medal size={16} className="text-yellow-400" />
            <h2 className="text-white font-semibold">Achievements</h2>
            <span className="text-xs text-slate-500 ml-1">
              {milestones.filter((m) => m.earned).length} / {milestones.length} earned
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {milestones.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${
                  m.earned
                    ? "border-indigo-500/50 bg-indigo-500/10"
                    : "border-white/5 bg-white/[0.02] opacity-40"
                }`}
              >
                <span className={`text-3xl ${!m.earned ? "grayscale" : ""}`}>{m.emoji}</span>
                <span className="text-xs font-semibold text-white leading-tight">{m.title}</span>
                <span className="text-xs text-slate-400 leading-tight">{m.desc}</span>
                {m.earned && (
                  <span className="text-xs text-emerald-400 font-medium">✓ Earned</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressPage;
