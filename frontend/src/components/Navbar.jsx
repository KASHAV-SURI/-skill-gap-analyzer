import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, LayoutDashboard, Activity, ClipboardList, Map, Shield } from "lucide-react";

const NAV = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Progress",  to: "/progress",  icon: Activity },
  { label: "Quizzes",   to: "/roles",     icon: ClipboardList },
  { label: "Roadmap",   to: "/roadmap",   icon: Map },
];
const ADMIN_NAV = { label: "Admin", to: "/admin", icon: Shield };

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navItems = user?.role === "admin" ? [...NAV, ADMIN_NAV] : NAV;

  const handleLogout = () => { logout(); navigate("/"); };

  const initials = (user?.name || "US")
    .split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center",
      padding: "0 28px", height: 60, gap: 24,
    }}>
      {/* Logo */}
      <Link
        to="/dashboard"
        style={{
          display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none", flexShrink: 0,
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "#3B82F6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 13,
          color: "#fff",
        }}>SG</div>
        <span style={{
          fontWeight: 700, fontSize: 16,
          color: "var(--text)",
        }}>SkillGap</span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
        {navItems.map(({ label, to, icon: Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 13px", borderRadius: 9,
                textDecoration: "none", fontSize: 14, fontWeight: 500,
                color: active ? "#3B82F6" : "var(--muted)",
                background: active ? "rgba(59,130,246,0.1)" : "transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--muted)";
                }
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          {user?.name?.split(" ")[0]}
        </span>

        {/* Avatar */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "#3B82F6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 12,
          color: "#fff", userSelect: "none",
        }}>
          {initials}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 13px", borderRadius: 9,
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--muted)", cursor: "pointer", fontSize: 13,
            fontWeight: 500, transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
