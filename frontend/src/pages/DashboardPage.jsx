import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const scoreColor = (s) => s >= 75 ? "#10B981" : s >= 50 ? "#F59E0B" : "#ef4444";
const levelColor = (level) => ({
  Advanced: "#10B981",
  Intermediate: "#F59E0B",
  Beginner: "#ef4444",
}[level] ?? "#94a3b8");

const formatDate = (d) => {
  const date = new Date(d);
  const diff = (Date.now() - date) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return "Today";
  if (diff < 172800) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const Card = ({ children, style }) => (
  <div style={{
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "20px 22px",
    ...style,
  }}>
    {children}
  </div>
);

const StatCard = ({ label, value, color }) => (
  <Card style={{ borderTop: `3px solid ${color}` }}>
    <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {label}
    </p>
    <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 700, color: "var(--text)" }}>
      {value}
    </p>
  </Card>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [results, setResults]   = useState([]);
  const [roles, setRoles]       = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [rRes, rolesRes, rmRes] = await Promise.all([
          api.get("/results/my"),
          api.get("/roles"),
          api.get("/roadmap/my"),
        ]);
        setResults(rRes.data.results || []);
        setRoles(rolesRes.data.roles || []);
        setRoadmaps(rmRes.data.roadmaps || []);
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const bestScore = results.length ? Math.max(...results.map((r) => r.score)) : null;
  const activeRoadmap = roadmaps[0];
  const name = user?.name?.split(" ")[0] ?? "there";

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
        <div className="spin" style={{ width: 28, height: 28, border: "2px solid #3B82F6", borderTopColor: "transparent", borderRadius: "50%" }} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Greeting */}
      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
          Welcome back, {name}
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--muted)" }}>
          {results.length === 0
            ? "Take your first quiz to discover your skill gaps."
            : `${results.length} quiz${results.length !== 1 ? "zes" : ""} completed so far.`}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Quizzes Taken"   value={results.length}                             color="#3B82F6" />
        <StatCard label="Best Score"      value={bestScore != null ? `${bestScore}%` : "--"} color="#10B981" />
        <StatCard label="Active Roadmaps" value={roadmaps.length}                            color="#8B5CF6" />
        <StatCard label="Roles Available" value={roles.length}                               color="#F59E0B" />
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Recent Results */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--text)" }}>Recent Results</h2>
            {results.length > 0 && (
              <Link to="/results" style={{ fontSize: 13, color: "#3B82F6", textDecoration: "none" }}>View all</Link>
            )}
          </div>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--muted)", fontSize: 14 }}>
              No results yet.{" "}
              <Link to="/roles" style={{ color: "#3B82F6" }}>Take a quiz</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {results.slice(0, 5).map((r, i) => (
                <div key={r._id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: i < Math.min(results.length, 5) - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
                      {r.role?.name ?? "Unknown Role"}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted)" }}>
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: scoreColor(r.score) }}>
                      {r.score}%
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: levelColor(r.level) }}>
                      {r.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Active Roadmap */}
        <Card style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--text)" }}>Active Roadmap</h2>
            {activeRoadmap && (
              <Link to={`/roadmap/${activeRoadmap._id}`} style={{ fontSize: 13, color: "#8B5CF6", textDecoration: "none" }}>Open</Link>
            )}
          </div>

          {!activeRoadmap ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px 0", color: "var(--muted)", fontSize: 14 }}>
              No roadmap yet.{" "}
              <Link to="/roles" style={{ color: "#8B5CF6", marginLeft: 4 }}>Take a quiz first</Link>
            </div>
          ) : (
            <>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>{activeRoadmap.role?.name}</span>
                  <span style={{ color: "var(--text)", fontWeight: 600 }}>{activeRoadmap.overallProgress}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.08)" }}>
                  <div style={{
                    height: "100%", borderRadius: 99,
                    background: "#3B82F6",
                    width: `${activeRoadmap.overallProgress || 0}%`,
                    transition: "width 0.5s",
                  }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {(activeRoadmap.items || []).slice(0, 4).map((item) => (
                  <div key={item._id} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 10px", borderRadius: 8,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: item.isCompleted ? "#10B981" : item.priority === "high" ? "#ef4444" : "#94a3b8",
                    }} />
                    <span style={{
                      fontSize: 13, flex: 1,
                      color: item.isCompleted ? "var(--muted)" : "var(--text)",
                      textDecoration: item.isCompleted ? "line-through" : "none",
                    }}>
                      {item.topic}
                    </span>
                    {item.isCompleted && (
                      <span style={{ fontSize: 11, color: "#10B981" }}>Done</span>
                    )}
                  </div>
                ))}
              </div>

              <Link
                to={`/roadmap/${activeRoadmap._id}`}
                style={{
                  display: "block", textAlign: "center", padding: "9px",
                  borderRadius: 8, border: "1px solid rgba(59,130,246,0.3)",
                  color: "#60a5fa", fontSize: 13, fontWeight: 500,
                  textDecoration: "none", background: "rgba(59,130,246,0.08)",
                }}
              >
                View full roadmap
              </Link>
            </>
          )}
        </Card>
      </div>

      {/* Start a Quiz */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--text)" }}>Start a Quiz</h2>
          <Link to="/roles" style={{ fontSize: 13, color: "#3B82F6", textDecoration: "none" }}>All roles</Link>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {roles.slice(0, 8).map((role) => (
            <Link
              key={role._id}
              to={`/quiz/${role.slug}`}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 14px", borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--muted)", fontSize: 13,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.color = "#60a5fa"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--muted)"; }}
            >
              {role.icon} {role.name}
            </Link>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default DashboardPage;
