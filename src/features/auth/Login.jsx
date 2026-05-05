// import { useState } from "react";
// import { loginUser } from "@/features/auth/authapi";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

// const Login = () => {

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     if (!email.includes("@")) {
//       return "Invalid email format";
//     }
//     if (password.length < 6) {
//       return "Password must be at least 6 characters";
//     }
//     return null;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await loginUser(email, password);

//       console.log("LOGIN FULL RESPONSE:", res);      
//     console.log("LOGIN DATA:", res?.data); 

//       if (!res?.success || !res?.data) {
//         throw new Error(res?.message || "Login failed");
//       }

//       const { accessToken, roles = [] } = res.data;
//          console.log("TOKEN:", accessToken);             
//     console.log("ROLES:", roles);     

//       if (!accessToken) {
//         throw new Error("Token missing from response");
//       }

//       // ✅ normalize role safely
//       const role = Array.isArray(roles) ? roles[0] : roles;

//       login(accessToken, role);

//       // ✅ redirect
//       if (roles.includes("ROLE_ADMIN")) {
//         navigate("/admin", { replace: true });
//       } else if (roles.includes("ROLE_USER")) {
//         navigate("/dashboard", { replace: true });
//       } else {
//         throw new Error("Unauthorized role");
//       }

//     } catch (err) {
//       console.error("Login error:", err);

//       // ✅ better error mapping
//       if (err.response?.status === 401) {
//         setError("Invalid email or password");
//       } else if (err.response?.status === 403) {
//         setError("Access denied");
//       } else {
//         setError(err.message || "Something went wrong");
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4
//       bg-[radial-gradient(circle_at_top,#1a1133,#07070a)] text-white">

//       <div className="w-full max-w-md p-8 rounded-2xl
//         bg-white/5 backdrop-blur-xl border border-white/10
//         shadow-[0_0_40px_rgba(147,51,234,0.25)]">

//         {/* HEADER */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl mb-3">
//             <img src="./cloudfinerlogo.png" alt="CloudFiner Logo" />
//           </div>
//           <h1 className="text-2xl font-bold">CloudFiner</h1>
//           <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-5">

//           {/* EMAIL */}
//           <div>
//             <label className="text-sm text-gray-400">Email</label>
//             <input
//               type="email"
//               className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="relative">
//             <label className="text-sm text-gray-400">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-9 text-sm text-gray-400 cursor-pointer"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           {/* ERROR */}
//           {error && (
//             <div className="text-red-400 text-sm text-center">{error}</div>
//           )}

//           {/* BUTTON */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//         </form>

//         {/* FOOTER */}
//         <div className="flex justify-between mt-5 text-sm text-gray-400">
//           <Link to="/forgot-password">Forgot Password</Link>
//           <Link to="/register">Sign Up</Link>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import { loginUser } from "@/features/auth/authapi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.includes("@")) {
      return "Invalid email format";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await loginUser(email, password);

      if (!res?.success || !res?.data) {
        throw new Error(res?.message || "Login failed");
      }

      const { accessToken, roles = [] } = res.data;

      if (!accessToken) {
        throw new Error("Token missing from response");
      }

      // ✅ normalize roles
      const rolesArr = Array.isArray(roles) ? roles : [roles];
      const role = rolesArr[0];

      // ✅ set auth
      login(accessToken, role);

      // ✅ FIX: delay navigation (important)
      setTimeout(() => {
        if (rolesArr.includes("ROLE_ADMIN")) {
          navigate("/admin", { replace: true });
        } else if (rolesArr.includes("ROLE_USER")) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 100);

    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 403) {
        setError("Access denied");
      } else {
        setError(err.message || "Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-[radial-gradient(circle_at_top,#1a1133,#07070a)] text-white">

      <div className="w-full max-w-md p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_0_40px_rgba(147,51,234,0.25)]">

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl mb-3">
            <img src="./cloudfinerlogo.png" alt="CloudFiner Logo" />
          </div>
          <h1 className="text-2xl font-bold">CloudFiner</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-sm text-gray-400 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="flex justify-between mt-5 text-sm text-gray-400">
          <Link to="/forgot-password">Forgot Password</Link>
          <Link to="/register">Sign Up</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;