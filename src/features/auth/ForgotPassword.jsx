


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "./authapi";

// ✅ Correct imports
import OTPInput from "./componant/OTPInput";
import PasswordStrength from "./componant/PasswordStrength";
import Toast from "./componant/Toast";
import SuccessScreen from "./componant/SuccessScreen";

import { useToast } from "./hooks/useToast";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const { toast, showToast } = useToast();

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await forgotPassword(email);

      if (res) {
        showToast("OTP sent to email 📩");
        setStep(2);
      } else {
        showToast("Failed to send OTP ❌", "error");
      }
    } catch {
      showToast("Something went wrong ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    setLoading(true);

    try {
      const res = await forgotPassword(email);

      if (res) {
        showToast("OTP resent 📩");
      } else {
        showToast("Failed ❌", "error");
      }
    } catch {
      showToast("Error ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match ❌", "error");
      return;
    }

    const otpValue = otp.join("");

    setLoading(true);

    try {
      const res = await resetPassword({
        email,
        otp: otpValue,
        newPassword
      });

      if (res) {
        showToast("Password reset successful ✅");
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showToast("Reset failed ❌", "error");
      }

    } catch {
      showToast("Invalid OTP ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-[radial-gradient(circle_at_top,#1a1133,#07070a)] text-white">

      <Toast toast={toast} />

      <div className="w-full max-w-md p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_0_40px_rgba(147,51,234,0.25)]">

        {/* SUCCESS */}
        {success ? (
          <SuccessScreen message="Password Reset Successful" />
        ) : (
          <>
            {/* HEADER */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-xl
                bg-gradient-to-br from-purple-500 to-pink-500
                flex items-center justify-center text-xl mb-3">
                🔐
              </div>

              <h1 className="text-2xl font-bold
                bg-gradient-to-r from-white to-purple-300
                bg-clip-text text-transparent">
                Forgot Password
              </h1>

              <p className="text-gray-400 text-sm mt-1">
                {step === 1
                  ? "Enter your email to receive OTP"
                  : "Enter OTP and new password"}
              </p>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-xl
                    bg-white/5 border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  className="w-full py-2 rounded-xl
                    bg-gradient-to-r from-purple-600 to-indigo-600
                    hover:from-purple-500 hover:to-indigo-500"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleReset} className="space-y-4">

                <OTPInput otp={otp} setOtp={setOtp} />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full px-4 py-2 rounded-xl
                      bg-white/5 border border-white/10
                      focus:ring-2 focus:ring-purple-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-2 text-sm text-gray-400 cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

                <PasswordStrength password={newPassword} />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 rounded-xl
                    bg-white/5 border border-white/10
                    focus:ring-2 focus:ring-purple-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-500"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="w-full text-sm text-purple-400"
                >
                  Resend OTP
                </button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
