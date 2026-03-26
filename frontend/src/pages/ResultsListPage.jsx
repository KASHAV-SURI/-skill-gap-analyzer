import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import { BarChart2, Clock, ChevronRight } from "lucide-react";

const levelColor = (level) => ({
  Beginner:     "text-red-400",
  Intermediate: "text-yellow-400",
  Advanced:     "text-green-400",
}[level] ?? "text-slate-400");

const ResultsListPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/results/my")
      .then(({ data }) => setResults(data.results || []))
      .catch(() => toast.error("Failed to load results"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Quiz History</h1>
        <p className="text-slate-400 text-sm">All your past quiz results in one place.</p>
      </div>

      {results.length === 0 ? (
        <div className="glass p-16 text-center">
          <BarChart2 size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 mb-4">You haven't taken any quizzes yet.</p>
          <Link to="/roles" className="btn-primary inline-flex">Start a Quiz</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="text-center w-16">
                  <p className="text-2xl font-black text-white">{r.score}%</p>
                  <p className={`text-xs font-medium ${levelColor(r.level)}`}>{r.level}</p>
                </div>
                <div>
                  <p className="font-medium text-white">{r.role?.name ?? "Unknown"}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {new Date(r.createdAt).toLocaleString()}
                    · Attempt #{r.attemptNo}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.weakTopics?.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs bg-red-500/10 text-red-400 rounded px-1.5 py-0.5">↓ {t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <Link to={`/results/${r._id}`} className="btn-ghost !py-1.5 !px-3 text-sm shrink-0">
                View <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ResultsListPage;
