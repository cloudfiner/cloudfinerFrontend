import { useState } from "react";
import { registerUser } from "./authapi";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 PASSWORD STRENGTH
  const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return "Weak";
    if (strength === 2 || strength === 3) return "Medium";
    return "Strong";
  };

  // 🔥 VALIDATION
  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && value.trim().length < 3) {
      error = "Name must be at least 3 characters";
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Enter a valid email";
    }

    if (name === "password") {
      if (value.length < 8) {
        error = "Minimum 8 characters required";
      } else if (!/[A-Z]/.test(value)) {
        error = "At least 1 uppercase required";
      } else if (!/[0-9]/.test(value)) {
        error = "At least 1 number required";
      }
    }

    return error;
  };

  // 🔥 HANDLE CHANGE (LIVE VALIDATION)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Final validation check
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
    });

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);

    if (hasError) return;

    const res = await registerUser(form);

    if (!res.success) {
      setMessage(res.message);
      return;
    }

    setMessage("Registration successful");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-[radial-gradient(circle_at_top,#1a1133,#07070a)] text-white">

      <div className="w-full max-w-md p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10">

        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* NAME */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
            />

            {/* SHOW/HIDE */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs cursor-pointer text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </span>

            {/* ERROR */}
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}

            {/* STRENGTH */}
            {form.password && (
              <p className={`text-xs mt-1 ${
                strength === "Weak"
                  ? "text-red-400"
                  : strength === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}>
                Strength: {strength}
              </p>
            )}
          </div>

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-red-400">{message}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-purple-600"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;