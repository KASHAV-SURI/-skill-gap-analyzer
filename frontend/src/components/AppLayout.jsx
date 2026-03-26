import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg)" }}>
    <Navbar />
    <main className="page-content">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Outlet />
      </div>
    </main>
  </div>
);

export default AppLayout;
