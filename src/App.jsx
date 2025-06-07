import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./features/Dashboard";
import Tables from "./features/Tables";
import Kanban from "./features/Kanban";
import Calendar from "./features/Calendar";
import Work from "./features/work";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

const Layout = ({ children }) => {
  const location = useLocation();

  // Don't show layout if on 404
  const isNotFound = location.pathname !== "/" &&
                     !["/tables", "/kanban", "/calendar", "/work"].includes(location.pathname);

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
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/work" element={<Work />} />
          <Route path="*" element={<div />} /> {/* Placeholder; actual 404 handled by Layout */}
        </Routes>
      </Layout>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
