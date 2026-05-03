import { createContext, useContext, useState, useEffect } from "react";
import { getAccessToken, clearAccessToken } from "@/lib/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = getAccessToken();
    const storedRole = localStorage.getItem("role");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (newToken, newRole) => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
      setToken(newToken);
    }

    if (newRole) {
      localStorage.setItem("role", newRole);
      setRole(newRole);
    }
  };

  const logout = () => {
    clearAccessToken();
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ only one export
export const useAuth = () => useContext(AuthContext);