import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  //  wait until auth loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  // no token → go login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✔️ token → allow
  return children;
};

export default ProtectedRoute;