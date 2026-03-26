import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Users,
  Shield,
  ClipboardCheck,
  BarChart3,
  UserCog,
  UserCheck,
  UserX,
} from "lucide-react";

const Stat = ({ icon: Icon, title, value, subtle }) => (
  <div className="glass p-4">
    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
      <Icon size={14} /> {title}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {subtle && <p className="text-xs text-slate-500 mt-1">{subtle}</p>}
  </div>
);

const AdminPage = () => {
  const [overview, setOverview] = useState(null);
  const [latestResults, setLatestResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (roleFilter) p.set("role", roleFilter);
    if (activeFilter) p.set("isActive", activeFilter);
    p.set("limit", "50");
    return p.toString();
  }, [roleFilter, activeFilter]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [ov, us] = await Promise.all([
        api.get("/admin/overview"),
        api.get(`/admin/users?${queryString}`),
      ]);
      setOverview(ov.data.overview);
      setLatestResults(ov.data.latestResults || []);
      setUsers(us.data.users || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load admin panel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [queryString]);

  const toggleActive = async (u) => {
    setBusyId(u._id);
    try {
      const { data } = await api.patch(`/admin/users/${u._id}/active`, {
        isActive: !u.isActive,
      });
      setUsers((prev) => prev.map((x) => (x._id === u._id ? data.user : x)));
      toast.success(`${data.user.name} is now ${data.user.isActive ? "active" : "inactive"}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update active state");
    } finally {
      setBusyId(null);
    }
  };

  const toggleRole = async (u) => {
    setBusyId(u._id);
    try {
      const nextRole = u.role === "admin" ? "employee" : "admin";
      const { data } = await api.patch(`/admin/users/${u._id}/role`, { role: nextRole });
      setUsers((prev) => prev.map((x) => (x._id === u._id ? data.user : x)));
      toast.success(`${data.user.name} is now ${data.user.role}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update role");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!overview) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Control Panel</h1>
        <p className="text-sm text-slate-400 mt-1">Monitor users, performance, and system activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Users} title="Total Users" value={overview.users.total} subtle={`${overview.users.active} active`} />
        <Stat icon={Shield} title="Admins" value={overview.users.admins} subtle={`${overview.users.employees} employees`} />
        <Stat icon={ClipboardCheck} title="Completed Quizzes" value={overview.quizzes.completed} subtle={`${overview.quizzes.total} total`} />
        <Stat icon={BarChart3} title="Average Score" value={`${overview.results.avgScore}%`} subtle={`${overview.results.total} results`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-5">
          <h2 className="text-white font-semibold mb-4">Latest Results</h2>
          <div className="flex flex-col gap-3">
            {latestResults.length === 0 && (
              <p className="text-sm text-slate-500">No results yet.</p>
            )}
            {latestResults.map((r) => (
              <div key={r._id} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-white font-medium">{r.user?.name || "Unknown user"}</p>
                  <p className="text-xs text-slate-500">{r.role?.name || "Unknown role"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-semibold">{r.score}%</p>
                  <p className="text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-5">
          <h2 className="text-white font-semibold mb-4">Role & Status Filters</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Role</label>
              <select className="input" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="">All</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Active State</label>
              <select className="input" value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}>
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-5 overflow-x-auto">
        <h2 className="text-white font-semibold mb-4">User Management</h2>
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-white/10">
              <th className="py-2 pr-3 font-medium">Name</th>
              <th className="py-2 pr-3 font-medium">Email</th>
              <th className="py-2 pr-3 font-medium">Role</th>
              <th className="py-2 pr-3 font-medium">Status</th>
              <th className="py-2 pr-3 font-medium">Joined</th>
              <th className="py-2 pr-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5 last:border-0">
                <td className="py-2 pr-3 text-white">{u.name}</td>
                <td className="py-2 pr-3 text-slate-400">{u.email}</td>
                <td className="py-2 pr-3">
                  <span className={`px-2 py-0.5 rounded text-xs border ${u.role === "admin" ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" : "bg-slate-500/10 text-slate-300 border-slate-500/30"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-2 pr-3">
                  <span className={`px-2 py-0.5 rounded text-xs border ${u.isActive ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}`}>
                    {u.isActive ? "active" : "inactive"}
                  </span>
                </td>
                <td className="py-2 pr-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="py-2 pr-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRole(u)}
                      disabled={busyId === u._id}
                      className="btn-ghost !px-2.5 !py-1.5 text-xs"
                    >
                      <UserCog size={13} /> {u.role === "admin" ? "Make Employee" : "Make Admin"}
                    </button>
                    <button
                      onClick={() => toggleActive(u)}
                      disabled={busyId === u._id}
                      className="btn-ghost !px-2.5 !py-1.5 text-xs"
                    >
                      {u.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminPage;
