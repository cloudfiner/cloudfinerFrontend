import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/lib/authService";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {

  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.roles ? decoded.roles[0] : "";

    if (role !== "ROLE_ADMIN") {
      return <Navigate to="/dashboard" replace />;
    }

  } catch (e) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;