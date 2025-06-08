import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./features/Dashboard";
import Tables from "./features/Tables";
import Kanban from "./features/Kanban";
import Calendar from "./features/Calendar";
import Work from "./features/work";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import
import Login from "./components/Login"; // 🔐 Your login page
import Unauthorized from "./components/Unauthorized"; // 🚫 Unauthorized fallback

const Layout = ({ children }) => {
  const location = useLocation();

  const allowedPaths = ["/", "/tables", "/kanban", "/calendar", "/work"];
  const isNotFound = !allowedPaths.includes(location.pathname);

  if (isNotFound) {
    return (
      <div className="h-screen bg-white text-red-600 flex items-center justify-center text-4xl font-bold">
        404 - Page Not Found
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="ml-64 min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </>
  );
};

const AppContent = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes (wrapped in Layout) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <Tables />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kanban"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <Kanban />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Layout>
              <Calendar />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/work"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <Work />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
