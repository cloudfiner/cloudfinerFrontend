import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/lib/authService";

const ProtectedRoute = ({ children }) => {

  const token = getAccessToken();

  // ✅ No token → demo user → allow
  if (!token) {
    return children;
  }

  // ✅ Token present → real user → allow
  return children;
};

export default ProtectedRoute;