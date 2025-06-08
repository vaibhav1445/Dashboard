import { Menu, Bell, User, LogOut } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth(); // ✅ Add logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow px-4 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onSidebarToggle}
        >
          <Menu className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Admin Dashboard
        </h2>
        <p className="text-sm">
          Welcome, <span className="font-medium">{user?.username}</span> ({user?.role})
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <Bell className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>

        {/* Theme Toggle */}
        <ThemeSwitcher />

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-700"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-red-600 dark:text-red-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
