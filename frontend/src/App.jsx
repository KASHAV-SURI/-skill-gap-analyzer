import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layout & guards
import AppLayout    from "./components/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute   from "./components/AdminRoute";

// Pages
import LandingPage     from "./pages/LandingPage";
import LoginPage       from "./pages/LoginPage";
import RegisterPage    from "./pages/RegisterPage";
import DashboardPage   from "./pages/DashboardPage";
import RolesPage       from "./pages/RolesPage";
import QuizPage        from "./pages/QuizPage";
import ResultPage      from "./pages/ResultPage";
import ResultsListPage from "./pages/ResultsListPage";
import RoadmapPage     from "./pages/RoadmapPage";
import AdminPage       from "./pages/AdminPage";
import ProgressPage    from "./pages/ProgressPage";

// Redirect logged-in users away from auth screens
const PublicRoute = ({ children }) => {
	const { user, loading } = useAuth();
	if (loading) return null;
	return user ? <Navigate to="/dashboard" replace /> : children;
};

const App = () => (
	<Routes>
		{/* Public */}
		<Route path="/" element={<LandingPage />} />
		<Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
		<Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

		{/* Protected (all wrapped in Navbar layout) */}
		<Route element={<PrivateRoute />}>
			<Route element={<AppLayout />}>
				<Route path="/dashboard"          element={<DashboardPage />} />
				<Route path="/progress"           element={<ProgressPage />} />
				<Route path="/roles"              element={<RolesPage />} />
				<Route path="/quiz/:slug"         element={<QuizPage />} />
				<Route path="/results"            element={<ResultsListPage />} />
				<Route path="/results/:resultId"  element={<ResultPage />} />
				<Route path="/roadmap"            element={<RoadmapPage />} />
				<Route path="/roadmap/:roadmapId" element={<RoadmapPage />} />
			</Route>
		</Route>

		{/* Admin-only */}
		<Route element={<PrivateRoute />}>
			<Route element={<AdminRoute />}>
				<Route element={<AppLayout />}>
					<Route path="/admin" element={<AdminPage />} />
				</Route>
			</Route>
		</Route>

		{/* Catch-all */}
		<Route path="*" element={<Navigate to="/" replace />} />
	</Routes>
);

export default App;
