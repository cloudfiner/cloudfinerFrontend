import { useState } from "react";
import { changePassword } from "./authapi";

const ChangePassword = () => {

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await changePassword(form);

    if (res) {
      alert("Password changed successfully ✅");
    } else {
      alert("Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-[radial-gradient(circle_at_top,#1a1133,#07070a)] text-white">

      {/* CARD */}
      <div className="w-full max-w-md p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_0_40px_rgba(147,51,234,0.25)]
        animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl
            bg-gradient-to-br from-purple-500 to-pink-500
            flex items-center justify-center text-xl mb-3">
            🔑
          </div>

          <h1 className="text-2xl font-bold
            bg-gradient-to-r from-white to-purple-300
            bg-clip-text text-transparent">
            Change Password
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Secure your account with a new password
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* OLD PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              className="w-full px-4 py-2 rounded-xl
                bg-white/5 border border-white/10
                focus:outline-none focus:ring-2 focus:ring-purple-500
                placeholder:text-gray-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className="w-full px-4 py-2 rounded-xl
                bg-white/5 border border-white/10
                focus:outline-none focus:ring-2 focus:ring-purple-500
                placeholder:text-gray-500"
              onChange={handleChange}
              required
            />

            {/* SHOW/HIDE */}
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-2 text-sm text-gray-400 cursor-pointer"
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {/* BUTTON */}
          <button
            className="w-full py-2 rounded-xl
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-500 hover:to-indigo-500
              transition-all shadow-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ChangePassword;