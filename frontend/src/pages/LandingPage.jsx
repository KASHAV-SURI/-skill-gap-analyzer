import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, BarChart2, Map, ShieldCheck, ArrowRight } from "lucide-react";

const FEATURES = [
  { icon: BarChart2, title: "Skill Assessment",    desc: "Role-based quizzes spanning 10+ job tracks with adaptive difficulty." },
  { icon: Map,       title: "Personalised Roadmap", desc: "Auto-generated learning roadmaps targeting your weakest topics first." },
  { icon: ShieldCheck, title: "Progress Tracking", desc: "Track completion, spot trends, and celebrate milestones as you grow." },
];

const ROLES = [
  "Frontend Dev", "Backend Dev", "MERN Stack", "Full Stack",
  "AI / ML", "Data Scientist", "DevOps", "Cloud Engineer",
  "Cybersecurity", "Mobile Dev",
];

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const LandingPage = () => (
  <div className="min-h-screen flex flex-col">
    {/* ── Nav ─────────────────────────────────── */}
    <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
      <span className="flex items-center gap-2 font-bold text-xl">
        <Zap size={22} className="text-blue-400" />
        <span className="gradient-text">SkillGap</span>
      </span>
      <div className="flex gap-3">
        <Link to="/login" className="btn-ghost !py-2 !px-4 text-sm">Login</Link>
        <Link to="/register" className="btn-primary !py-2 !px-4 text-sm">Get Started</Link>
      </div>
    </nav>

    {/* ── Hero ────────────────────────────────── */}
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
      <motion.div
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="max-w-3xl"
      >
        <motion.h1 variants={fade} className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Know Your <span className="gradient-text">Skill Gaps.</span>
          <br className="hidden md:block" /> Close Them Fast.
        </motion.h1>
        <motion.p variants={fade} className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
          Take a role-based assessment, see exactly where you stand, and get a personalised roadmap to land your dream job.
        </motion.p>
        <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register" className="btn-primary text-base px-8 py-3">
            Start for Free <ArrowRight size={16} />
          </Link>
          <Link to="/login" className="btn-ghost text-base px-8 py-3">
            I have an account
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating role pills */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-2 mt-16 max-w-2xl"
      >
        {ROLES.map((r) => (
          <span key={r} className="glass px-3 py-1 text-xs text-slate-300 rounded-full">
            {r}
          </span>
        ))}
      </motion.div>
    </section>

    {/* ── Features ────────────────────────────── */}
    <section className="px-4 py-20 max-w-6xl mx-auto w-full">
      <h2 className="text-center text-3xl font-bold mb-12">
        Everything you need to <span className="gradient-text">level up</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }} viewport={{ once: true }}
            className="glass p-6"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Icon size={20} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── Footer ──────────────────────────────── */}
    <footer className="text-center text-xs text-slate-600 py-6 border-t border-white/5">
      © {new Date().getFullYear()} SkillGap · Built with MERN
    </footer>
  </div>
);

export default LandingPage;
