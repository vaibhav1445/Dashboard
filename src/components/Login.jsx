import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    const userData = { username, role };
    localStorage.setItem("authUser", JSON.stringify(userData));
    login(username, role);
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">Sign In</h2>

        {/* Username input */}
        <div className="relative">
          <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Role select */}
        <div className="relative">
          <MdAdminPanelSettings className="absolute left-3 top-3 text-gray-400" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
