import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Award, TrendingDown, TrendingUp, Map,
  ChevronRight, BarChart2, Clock, CheckCircle, XCircle,
} from "lucide-react";

const levelColor = (level) => ({
  Beginner:     { text: "text-red-400",    bg: "bg-red-500/15",    border: "border-red-500/30" },
  Intermediate: { text: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-500/30" },
  Advanced:     { text: "text-green-400",  bg: "bg-green-500/15",  border: "border-green-500/30" },
}[level] ?? { text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30" });

const severityColor = (pct) => {
  if (pct < 30)  return "bg-red-500";
  if (pct < 50)  return "bg-orange-500";
  if (pct < 75)  return "bg-yellow-500";
  return "bg-emerald-500";
};

const ResultPage = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const { questions: reviewQuestions, gradedAnswers } = location.state || {};
  const gradeMap = {};
  if (gradedAnswers) {
    gradedAnswers.forEach((g) => { gradeMap[g.questionId?.toString()] = g; });
  }
  const OPTION_LABELS = ["A", "B", "C", "D"];

  useEffect(() => {
    api.get(`/results/${resultId}`)
      .then(({ data }) => setResult(data.result))
      .catch(() => { toast.error("Result not found"); navigate("/dashboard"); })
      .finally(() => setLoading(false));
  }, [resultId, navigate]);

  const generateRoadmap = async () => {
    setGenerating(true);
    try {
      const { data } = await api.post(`/roadmap/generate/${resultId}`);
      toast.success("Roadmap generated!");
      navigate(`/roadmap/${data.roadmap._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate roadmap");
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!result) return null;

  const lc = levelColor(result.level);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* ── Score card ────────────────────────── */}
      <div className={`glass p-8 text-center border ${lc.border}`}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${lc.bg} ${lc.text} border ${lc.border}`}>
          <Award size={12} /> {result.level}
        </div>
        <p className="text-7xl font-black text-white mb-2">{result.score}%</p>
        <p className="text-slate-400 text-sm">{result.role?.name} · {result.quiz?.difficulty ?? "Quiz"}</p>
        <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
          <Clock size={11} /> {new Date(result.createdAt).toLocaleString()}
        </p>

        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={generateRoadmap} disabled={generating}
            className="btn-primary px-6"
          >
            {generating
              ? <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              : <><Map size={15} /> Generate Roadmap</>}
          </button>
          <Link to="/roles" className="btn-ghost px-5">Take Another</Link>
        </div>
      </div>

      {/* ── Weak topics ──────────────────────── */}
      {result.weakTopics?.length > 0 && (
        <div className="glass p-5">
          <h2 className="font-semibold text-white flex items-center gap-2 mb-4">
            <TrendingDown size={16} className="text-red-400" /> Topics to Improve
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.weakTopics.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg text-xs bg-red-500/15 text-red-300 border border-red-500/25">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Strong topics ─────────────────────── */}
      {result.strongTopics?.length > 0 && (
        <div className="glass p-5">
          <h2 className="font-semibold text-white flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-emerald-400" /> Strengths
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.strongTopics.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Topic breakdown ──────────────────── */}
      <div className="glass p-5">
        <h2 className="font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart2 size={16} className="text-indigo-400" /> Topic Breakdown
        </h2>
        <div className="flex flex-col gap-3">
          {result.topicBreakdown?.map((t) => (
            <div key={t.topic}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{t.topic}</span>
                <span className="text-slate-400 font-medium">{t.correct}/{t.total} · {t.percentage}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${severityColor(t.percentage)}`}
                  style={{ width: `${t.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Answer Review ───────────────────── */}
      {reviewQuestions?.length > 0 && (
        <div className="glass p-5">
          <h2 className="font-semibold text-white flex items-center gap-2 mb-5">
            <CheckCircle size={16} className="text-cyan-400" /> Answer Review
          </h2>
          <div className="flex flex-col gap-4">
            {reviewQuestions.map((q, qi) => {
              const grade = gradeMap[q._id?.toString()];
              const userAns = grade?.selectedOption;
              const correctAns = grade?.correctAnswer;
              const isCorrect = grade?.isCorrect;
              return (
                <div
                  key={q._id}
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-red-500/30 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                      Q{qi + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-white text-sm leading-relaxed">{q.text}</p>
                      {q.topic && (
                        <span className="text-xs text-slate-500 mt-1 block">Topic: {q.topic}</span>
                      )}
                    </div>
                    {isCorrect
                      ? <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      : <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />}
                  </div>
                  <div className="flex flex-col gap-1.5 ml-8">
                    {q.options.map((opt, oi) => {
                      const isCorrectOpt = oi === correctAns;
                      const isUserOpt = oi === userAns && userAns !== -1 && userAns !== undefined;
                      let cls = "border-white/10 text-slate-500";
                      if (isCorrectOpt) cls = "border-emerald-500/50 bg-emerald-500/15 text-emerald-300";
                      else if (isUserOpt) cls = "border-red-500/50 bg-red-500/15 text-red-300";
                      return (
                        <div key={oi} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${cls}`}>
                          <span className="w-5 h-5 flex items-center justify-center rounded font-bold bg-white/10 shrink-0">
                            {OPTION_LABELS[oi]}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isCorrectOpt && (
                            <span className="text-emerald-400 font-semibold ml-auto">✓ Correct</span>
                          )}
                          {isUserOpt && !isCorrectOpt && (
                            <span className="text-red-400 font-semibold ml-auto">✗ Your answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Back link ────────────────────────── */}
      <Link to="/dashboard" className="text-sm text-slate-400 hover:text-white flex items-center gap-1 w-fit">
        ← Back to Dashboard
      </Link>
    </motion.div>
  );
};

export default ResultPage;
