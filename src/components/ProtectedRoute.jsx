// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [], requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const roleAllowed = requiredRole
    ? user.role === requiredRole
    : allowedRoles.length === 0 || allowedRoles.includes(user.role);

  if (!roleAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
