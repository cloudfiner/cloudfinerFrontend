import { useNavigate } from "react-router-dom";
import { clearTokens } from "@/lib/authService";

import "../../style/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  // 🔥 Demo mode (no token = demo)
  const handleDemo = () => {
    clearTokens(); // ensure demo state
    navigate("/dashboard");
  };

  // 🔥 Real user onboarding
  const handleConnectAWS = () => {
    clearTokens(); // clean state before login
    navigate("/login");
  };

  return (
    <section className="pt-32 pb-32 px-6 relative min-h-[90vh] flex items-center">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Save Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-900 to-violet-900 border border-purple-400/30 rounded-full text-sm font-medium mb-10">
          <span className="text-purple-400">✦</span> 
          Save up to 30% on cloud bills
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-[82px] font-bold leading-none tracking-tighter mb-8">
          Stop Wasting <br />
          <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            Money on Cloud Bills
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
          Track, analyze, and optimize your AWS costs in seconds.<br />
          Built for startups, developers, and students.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

          <button
            onClick={handleConnectAWS}
            className="capsule-btn bg-gradient-to-r from-purple-600 to-violet-600 text-white"
          >
            Start Free
          </button>

          <button
            onClick={handleDemo}
            className="capsule-btn border border-white/40 text-white hover:bg-white/10"
          >
            Try Demo
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;