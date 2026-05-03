import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TelegramConnect from "../../cloud/telegram/TelegramConnect";
import BellNotification from "../../notifications/BellNotification";
import { logoutUser } from "@/features/auth/authapi";
import { getAccessToken } from "@/lib/authService";
import "@/style/DashboardHeader.css";
const DashboardHeader = ({
  currency,
  setCurrency,
  days,
  setDays
}) => {

  const navigate = useNavigate();

  const dayOptions = [1, 7, 30, 90];
  const [openProfile, setOpenProfile] = useState(false);

  // 🔥 AWS connection state
  const [awsConnected, setAwsConnected] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("awsConnected");
    setAwsConnected(status === "true");
  }, []);

  // 🔥 detect demo vs real
  const token = getAccessToken();
  const isDemo = !token;

  // 🔥 dynamic user email
  let userEmail = "demo@cloudfiner.com";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userEmail = payload.sub || "user@cloudfiner.com";
    } catch (e) {
      userEmail = "user@cloudfiner.com";
    }
  }

  const firstLetter = userEmail.charAt(0).toUpperCase();

  // logout
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div>
      <div className="soft-card px-8 py-3 flex items-center justify-between relative z-10">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-xs mt-1">
            Track and optimize your cloud costs
          </p>
        </div>

        {/* TELEGRAM */}
        <div className="flex-1 flex justify-center px-6">
          <div className="w-full max-w-md">
            <TelegramConnect />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <BellNotification />

          {/* AWS CONNECT BUTTON */}
        <button
  onClick={() => navigate("/connect-aws")}
  className={`aws-btn ${awsConnected ? "connected" : ""}`}
>
  <span className="dot"></span>
  {awsConnected ? "AWS Connected" : "Connect AWS"}
</button>
{/* Currency */}
<div className="currency-toggle">
  <button
    onClick={() => setCurrency("INR")}
    className={currency === "INR" ? "active" : ""}
  >
    ₹
  </button>

  <button
    onClick={() => setCurrency("USD")}
    className={currency === "USD" ? "active" : ""}
  >
    $
  </button>
</div>

{/* Days */}
<select
  value={days}
  onChange={(e) => setDays(Number(e.target.value))}
  className="days-select"
>
  {dayOptions.map((d) => (
    <option key={d} value={d}>
      {d} Days
    </option>
  ))}
</select>

{/* Profile */}
<div className="profile-wrapper">
  <button
    onClick={() => setOpenProfile(!openProfile)}
    className="profile-btn"
  >
    {firstLetter}
  </button>

  {openProfile && (
    <div className="profile-dropdown">
      <div className="email">{userEmail}</div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;