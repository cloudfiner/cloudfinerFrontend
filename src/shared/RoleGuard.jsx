import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/lib/authService";
import { jwtDecode } from "jwt-decode";

const RoleGuard = ({ children, allowedRoles = [] }) => {

  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const roles = decoded.roles || [];

    const hasAccess = roles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
      return <Navigate to="/dashboard" replace />;
    }

  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleGuard;