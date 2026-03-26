import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Clock, ChevronRight, ChevronLeft, Send, Sparkles, Zap } from "lucide-react";

const OPTION_LABELS = ["A", "B", "C", "D"];

const DIFF_COLOR = {
  easy:   "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  hard:   "text-red-400 bg-red-500/10 border-red-500/30",
};

const QUESTION_TIME = 30;

const TimerCircle = ({ timeLeft }) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const fill = circ * (timeLeft / QUESTION_TIME);
  const urgent = timeLeft <= 10;
  return (
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={r} fill="none"
          stroke={urgent ? "#ef4444" : "#3b82f6"}
          strokeWidth="3"
          strokeDasharray={`${fill} ${circ}`}
          style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.3s" }}
        />
      </svg>
      <span className={`text-xs font-bold tabular-nums z-10 ${urgent ? "text-red-400 animate-pulse" : "text-white"}`}>
        {timeLeft}
      </span>
    </div>
  );
};

const QuizPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isAI       = searchParams.get("ai") === "true";
  const useAdaptive = searchParams.get("adaptive") === "true";
  const difficulty  = searchParams.get("difficulty") || "medium";

  const [quiz, setQuiz]           = useState(null);
  const [answers, setAnswers]     = useState({});
  const [current, setCurrent]     = useState(0);
  const [elapsed, setElapsed]     = useState(0);
  const [timeLeft, setTimeLeft]   = useState(QUESTION_TIME);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading]     = useState(true);
  const answersRef                 = useRef({});
  useEffect(() => { answersRef.current = answers; }, [answers]);

  // Start quiz on mount
  useEffect(() => {
    const endpoint = isAI ? "/quiz/ai-start" : "/quiz/start";
    const body = isAI
      ? { roleSlug: slug, useAdaptive, ...(useAdaptive ? {} : { difficulty }) }
      : { roleSlug: slug, difficulty };

    api.post(endpoint, body)
      .then(({ data }) => setQuiz(data.quiz))
      .catch((err) => {
        const msg = err.response?.data?.message || "Failed to start quiz";
        toast.error(msg);
        if (isAI && err.response?.status === 503) {
          toast("Tip: Add your OpenRouter API key to enable AI quizzes.", { icon: "ℹ️" });
        }
        navigate("/roles");
      })
      .finally(() => setLoading(false));
  }, [slug, difficulty, isAI, useAdaptive, navigate]);

  // Overall elapsed timer
  useEffect(() => {
    if (!quiz) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [quiz]);

  // Reset 30s countdown on each new question
  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
  }, [current]);

  // Per-question 30s countdown — auto-advance or auto-submit
  useEffect(() => {
    if (!quiz || submitting) return;
    if (timeLeft <= 0) {
      if (current < quiz.questions.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setSubmitting(true);
        const payload = quiz.questions.map((q) => ({
          questionId: q._id,
          selectedOption: answersRef.current[q._id] ?? -1,
        }));
        api.post(`/quiz/${quiz.quizId}/submit`, { answers: payload })
          .then(({ data }) => {
            toast.success("⏰ Time's up! Quiz auto-submitted.");
            navigate(`/results/${data.result.resultId}`, {
              state: { questions: quiz.questions, gradedAnswers: data.gradedAnswers },
            });
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "Submission failed");
            setSubmitting(false);
          });
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, quiz, current, submitting, navigate]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const select = (qId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const submit = useCallback(async () => {
    const unanswered = quiz.questions.filter((q) => answers[q._id] === undefined);
    if (unanswered.length > 0) {
      toast.error(`Please answer all questions (${unanswered.length} remaining)`);
      return;
    }
    setSubmitting(true);
    try {
      const payload = quiz.questions.map((q) => ({
        questionId: q._id,
        selectedOption: answers[q._id],
      }));
      const { data } = await api.post(`/quiz/${quiz.quizId}/submit`, { answers: payload });
      toast.success("Quiz submitted!");
      navigate(`/results/${data.result.resultId}`, {
        state: { questions: quiz.questions, gradedAnswers: data.gradedAnswers },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
      setSubmitting(false);
    }
  }, [quiz, answers, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">
          {isAI ? "✨ Generating your personalised AI quiz…" : "Preparing your quiz…"}
        </p>
        {isAI && (
          <p className="text-xs text-slate-500">This may take a few seconds</p>
        )}
      </div>
    );
  }

  if (!quiz) return null;

  const questions    = quiz.questions;
  const q            = questions[current];
  const progress     = ((current + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const diffColor    = DIFF_COLOR[quiz.difficulty] || DIFF_COLOR.medium;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto flex flex-col gap-6">
      {/* ── Header ───────────────────────────── */}
      <div className="glass p-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-white">{quiz.role?.name} Quiz</p>
            {quiz.isAI && (
              <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                <Sparkles size={10} /> AI-Generated
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs border px-2 py-0.5 rounded-md capitalize ${diffColor}`}>
              {quiz.difficulty}
            </span>
            {quiz.adaptiveDifficulty && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Zap size={10} className="text-indigo-400" /> Adaptive
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 flex items-center gap-1">
            <Clock size={14} /> {formatTime(elapsed)}
          </span>
          <TimerCircle timeLeft={timeLeft} />
          <span className="text-sm text-slate-400">
            {answeredCount} / {questions.length} answered
          </span>
        </div>
      </div>

      {/* ── Progress bar ─────────────────────── */}
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <motion.div
          className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── Question ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q._id}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="glass p-6 flex flex-col gap-5"
        >
          <div className="flex items-start gap-3">
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md font-medium shrink-0">
              Q{current + 1}
            </span>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-white leading-relaxed">{q.text}</p>
              {q.topic && (
                <span className="text-xs text-slate-500 mt-1">Topic: {q.topic}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mt-1">
            {q.options.map((opt, idx) => {
              const selected = answers[q._id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => select(q._id, idx)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                    selected
                      ? "border-indigo-500 bg-indigo-500/20 text-white"
                      : "border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  <span className={`inline-flex w-6 h-6 items-center justify-center rounded-md text-xs font-bold mr-3 ${
                    selected ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-400"
                  }`}>
                    {OPTION_LABELS[idx]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
              disabled={current === 0}
              className="btn-ghost !py-2 !px-4 text-sm disabled:opacity-30"
            >
              <ChevronLeft size={15} /> Prev
            </button>

            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="btn-primary !py-2 !px-5 text-sm"
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={submit} disabled={submitting}
                className="btn-primary !py-2 !px-5 text-sm"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Send size={14} /> Submit Quiz</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Question dots ────────────────────── */}
      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((q_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
              i === current
                ? "bg-indigo-500 text-white"
                : answers[q_._id] !== undefined
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizPage;
