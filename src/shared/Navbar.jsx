import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useRef } from "react";
import { getAccessToken, clearTokens } from "@/lib/authService";

const Navbar = () => {

  const navigate = useNavigate();
  const token = getAccessToken(); // ✅ correct source

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  let role = "";
  let name = "User";
  let email = "";

  // ✅ Decode token safely
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.roles ? decoded.roles[0] : "";
      name = decoded.name || decoded.sub || "User";
      email = decoded.email || "";
    } catch (e) {
      console.error("Invalid token");
    }
  }

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout (clean)
  const handleLogout = () => {
    clearTokens(); // ✅ proper cleanup
    navigate("/");
  };

  // 🔥 Demo detection (NO TOKEN = DEMO)
  const isDemo = !token;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">

      {/* Logo */}
      <span 
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        CloudFiner
      </span>

      {/* Right Section */}
      <div className="ms-auto d-flex align-items-center gap-3">

        {/* Dashboard */}
        {/* Dashboard */}
<Link
  to={isDemo ? "/demo" : "/dashboard"}
  className="text-white text-decoration-none"
>
  <i className="bi bi-speedometer2 me-1"></i>
  Dashboard
</Link>

        {/* Admin */}
        {!isDemo && role === "ROLE_ADMIN" && (
          <Link to="/admin" className="text-warning text-decoration-none">
            <i className="bi bi-shield-lock me-1"></i>
            Admin
          </Link>
        )}

        {/* Demo Badge */}
        {isDemo && (
          <span className="badge bg-warning text-dark">
            Demo Mode
          </span>
        )}

        {/* Notification Icon */}
        {!isDemo && (
          <i className="bi bi-bell fs-5 text-white" style={{ cursor: "pointer" }}></i>
        )}

        {/* User Dropdown */}
        {!isDemo && token && (
          <div className="position-relative" ref={dropdownRef}>

            {/* Avatar */}
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(!open)}
            >
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: "35px", height: "35px" }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
              <i className="bi bi-caret-down-fill text-white"></i>
            </div>

            {/* Dropdown */}
            {open && (
              <div
                className="position-absolute end-0 mt-2 bg-white text-dark shadow rounded p-3"
                style={{ width: "220px", zIndex: 1000 }}
              >

                {/* User Info */}
                <div className="mb-2">
                  <strong>{name}</strong>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    {email}
                  </div>
                </div>

                <hr />

                {/* Change Password */}
                <button
                  className="btn btn-sm btn-outline-primary w-100 mb-2"
                  onClick={() => navigate("/change-password")}
                >
                  <i className="bi bi-key me-1"></i>
                  Change Password
                </button>

                {/* Logout */}
                <button
                  className="btn btn-sm btn-danger w-100"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;