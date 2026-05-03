import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getAccessToken } from "@/lib/authService";
import { jwtDecode } from "jwt-decode";
import "../style/Sidebar.css";

const Sidebar = () => {

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const token = getAccessToken();

  // 🔥 Decode role from token
  let role = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.roles ? decoded.roles[0] : "";
    } catch (e) {
      console.error("Invalid token");
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="sidebar-header">

        {!collapsed && (
          <div className="logo">
            <div className="logo-icon"> <img 
        src="/cloudfinerlogo.png" 
        alt="CloudFiner Logo" 
      /></div>
            <span>CloudFiner</span>
          </div>
        )}

        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      {/* MENU */}
      <ul className="menu">

        {/* DASHBOARD */}
        <li>
          <Link
            to="/dashboard"
            className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
          >
            {!collapsed && "Dashboard"}
          </Link>
        </li>

        {/* ANALYTICS */}
        <li>
          <Link
            to="/analytics"
            className={`menu-item ${isActive("/analytics") ? "active" : ""}`}
          >
            {!collapsed && "Analytics"}
          </Link>
        </li>

        {/* SETTINGS */}
        {/* <li>
          <Link
            to="/settings"
            className={`menu-item ${isActive("/settings") ? "active" : ""}`}
          >
            {!collapsed && "Settings"}
          </Link>
        </li> */}

        {/* ADMIN PANEL */}
        {token && role === "ROLE_ADMIN" && (
          <li>
            <Link
              to="/admin"
              className={`menu-item ${isActive("/admin") ? "active" : ""}`}
            >
              {!collapsed && "Admin Panel"}
            </Link>
          </li>
        )}

      </ul>

    </div>
  );
};

export default Sidebar;