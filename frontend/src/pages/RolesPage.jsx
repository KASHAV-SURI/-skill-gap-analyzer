import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import { ArrowRight, Search, Sparkles, Zap } from "lucide-react";

const DIFFICULTY_OPTIONS = ["easy", "medium", "hard"];

const RolesPage = () => {
  const [roles, setRoles]       = useState([]);
  const [search, setSearch]     = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [aiMode, setAiMode]     = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get("/roles")
      .then(({ data }) => setRoles(data.roles || []))
      .catch(() => toast.error("Failed to load roles"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const getQuizLink = (role) => {
    if (aiMode) return `/quiz/${role.slug}?ai=true&adaptive=true`;
    return `/quiz/${role.slug}?difficulty=${difficulty}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Choose a Role</h1>
        <p className="text-slate-400 text-sm">Select a job track to start your skill assessment.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search" placeholder="Search roles…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="input pl-8"
          />
        </div>

        {/* Difficulty (disabled when AI mode is on) */}
        <div className={`flex gap-2 transition-opacity ${aiMode ? "opacity-30 pointer-events-none" : ""}`}>
          {DIFFICULTY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize border ${
                difficulty === d
                  ? "bg-indigo-500/30 border-indigo-500 text-indigo-300"
                  : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* AI Mode toggle */}
        <button
          onClick={() => setAiMode((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            aiMode
              ? "bg-purple-500/25 border-purple-500 text-purple-300"
              : "border-white/10 text-slate-400 hover:border-purple-500/40 hover:text-purple-300"
          }`}
        >
          <Sparkles size={14} />
          AI Mode
          {aiMode && <span className="text-xs opacity-70">(Adaptive)</span>}
        </button>
      </div>

      {/* AI Mode info banner */}
      {aiMode && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 glass !bg-purple-500/10 border-purple-500/30 p-4 rounded-xl text-sm"
        >
          <Zap size={16} className="text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-purple-200 font-medium">AI-Powered Adaptive Quiz</p>
            <p className="text-slate-400 text-xs mt-0.5">
              Questions are generated live by AI and tuned to your current skill level.
              Difficulty adapts based on your past performance for each role.
              Requires an OpenRouter API key in your backend settings.
            </p>
          </div>
        </motion.div>
      )}

      {/* Role grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((role, i) => (
          <motion.div
            key={role._id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-5 flex flex-col gap-3 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{role.icon || "💼"}</span>
                <h3 className="font-semibold text-white">{role.name}</h3>
              </div>
              {aiMode && (
                <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles size={9} /> AI
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{role.description}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {role.topics?.slice(0, 4).map((t) => (
                <span key={t.name} className="text-xs bg-white/5 border border-white/10 rounded-md px-2 py-0.5 text-slate-400">
                  {t.name}
                </span>
              ))}
              {role.topics?.length > 4 && (
                <span className="text-xs text-slate-500">+{role.topics.length - 4}</span>
              )}
            </div>
            <Link
              to={getQuizLink(role)}
              className={`mt-auto text-sm !py-2 flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all ${
                aiMode
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
                  : "btn-primary"
              }`}
            >
              {aiMode ? <><Sparkles size={13} /> AI Quiz</> : <>Start Quiz</>}
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-16">No roles match "{search}".</p>
      )}
    </motion.div>
  );
};

export default RolesPage;
