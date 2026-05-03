import { useState } from "react";
import { resetPassword } from "./authapi";

const ResetPassword = () => {

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await resetPassword(form);
    alert("Password reset successful");
  };

  return (
    <div className="container mt-5">

      <h3>Reset Password</h3>

      <form onSubmit={handleSubmit}>

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="otp"
          placeholder="OTP"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="newPassword"
          placeholder="New Password"
          type="password"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Reset Password
        </button>

      </form>

    </div>
  );
};

export default ResetPassword;