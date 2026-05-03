import { useNavigate } from "react-router-dom";
import { clearTokens } from "@/lib/authService";

const CTASection = () => {
  const navigate = useNavigate();

  const handleConnectAWS = () => {
    // ✅ Ensure clean state (demo mode)
    clearTokens();

    // 👉 Redirect to login for real onboarding
    navigate("/login");
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-900 via-violet-900 to-black text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold mb-6">
          Start Optimizing Your<br />Cloud Costs Today
        </h2>

        <p className="text-xl text-gray-300 mb-10">
          Free forever for students. No credit card required. Setup in under 2 minutes.
        </p>

        <button
          onClick={handleConnectAWS}
          className="px-12 py-4 bg-white text-black font-semibold rounded-3xl text-xl hover:scale-105 transition-all shadow-xl"
        >
          Get Started Free →
        </button>
      </div>
    </section>
  );
};

export default CTASection;