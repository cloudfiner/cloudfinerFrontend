import { useEffect, useState } from "react";
import {
  connectTelegram,
  checkTelegramStatus,
  disconnectTelegram
} from "./telegramService";
import { getAccessToken } from "@/lib/authService";
import "../../../style/Telegram.css";

const TelegramConnect = () => {

  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const token = getAccessToken();
      if (!token) return;

      const res = await checkTelegramStatus();
      setConnected(res?.connected || false);
    } catch (e) {
      console.error("Status fetch error:", e);
    }
  };

  useEffect(() => {

    fetchStatus();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchStatus();
      }
    };

    window.addEventListener("focus", fetchStatus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", fetchStatus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };

  }, []);

  const handleConnect = async () => {
    try {
      setLoading(true);

      const res = await connectTelegram();

      if (res?.link) {
        window.open(res.link, "_blank");
      }

      //  IMPORTANT FIX → refresh after connect
      setTimeout(() => {
        fetchStatus();
      }, 2000);

    } catch (err) {
      console.error("Connect error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectTelegram();
      setConnected(false);

      // optional refresh
      fetchStatus();

    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  return (
    <div className="tg-card">

      <div className="tg-left">
        <span className="tg-title">Telegram</span>

        {connected && (
          <span className="tg-status">
            <span className="dot"></span> Connected
          </span>
        )}
      </div>

      <div className="tg-right">
        {connected ? (
          <button className="tg-btn danger" onClick={handleDisconnect}>
            Disconnect
          </button>
        ) : (
          <button
            className="tg-btn primary"
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>

    </div>
  );
};

export default TelegramConnect;