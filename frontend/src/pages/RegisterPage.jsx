import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Zap, Eye, EyeOff } from "lucide-react";

const JOB_ROLES = [
  "frontend-dev", "backend-dev", "mern-stack", "full-stack",
  "ai-ml", "data-scientist", "devops", "cloud-engineer",
  "cybersecurity-analyst", "mobile-app-dev",
];

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", jobRole: "", department: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Welcome, ${user.name.split(" ")[0]}! 🎉`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass p-8 w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-8">
          <Zap size={20} className="text-indigo-400" />
          <span className="gradient-text font-bold text-xl">SkillGap</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
        <p className="text-sm text-slate-400 mb-6">Start your skill journey today</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
            <input name="name" required placeholder="Jane Doe" value={form.name} onChange={onChange} className="input" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
            <input type="email" name="email" required autoComplete="email" placeholder="you@example.com" value={form.email} onChange={onChange} className="input" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"} name="password" required
                placeholder="Min. 6 characters" value={form.password} onChange={onChange}
                className="input pr-10"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Job Role</label>
            <select name="jobRole" value={form.jobRole} onChange={onChange} className="input">
              <option value="">Select a role…</option>
              {JOB_ROLES.map((r) => (
                <option key={r} value={r}>{r.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Department <span className="text-slate-600">(optional)</span></label>
            <input name="department" placeholder="Engineering" value={form.department} onChange={onChange} className="input" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-2 w-full py-2.5">
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
