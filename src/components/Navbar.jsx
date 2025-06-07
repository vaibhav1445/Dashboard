import { Menu, Bell, User } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = ({ onSidebarToggle }) => {
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow px-4 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button for Mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onSidebarToggle}
        >
          <Menu className="w-5 h-5 text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Admin Dashboard
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Optional Search Bar */}
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

        {/* User Profile Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
