import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearTokens } from "@/lib/authService";
import "../../style/Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  //  ULTRA SMOOTH SCROLL
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = 120;
    const targetY =
      el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 800;

    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "about"];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <nav className="navbar">
  {/* LEFT - LOGO */}
  <div className="logo">
    <div className="logo-icon">
      <img 
        src="/cloudfinerlogo.png" 
        alt="CloudFiner Logo" 
      />
    </div>
    <span>CloudFiner</span>
  </div>

      {/* RIGHT */}
      <div className="nav-buttons">

        <button
          onClick={() => scrollToSection("features")}
          className={`btn-soft ${active === "features" ? "active-btn" : ""}`}
        >
          Features
        </button>

        <button
          onClick={() => scrollToSection("about")}
          className={`btn-soft ${active === "about" ? "active-btn" : ""}`}
        >
          About
        </button>

        <button onClick={() => navigate("/login")} className="btn-soft">
          Login
        </button>

        {/* 🔥 CONNECT AWS */}
        <button
          onClick={() => {
            clearTokens(); // clean state
            localStorage.setItem("awsConnected", "true"); // optional flag
            navigate("/login");
          }}
          className="btn-outline"
        >
          Connect AWS
        </button>

        {/* 🔥 TRY DEMO */}
        <button
          onClick={() => {
            clearTokens(); // remove token → demo mode
            navigate("/dashboard");
          }}
          className="btn-primary"
        >
          Try Demo
        </button>

      </div>

    </nav>
  );
};

export default Navbar;