import { useState, useEffect, useRef } from "react";
import { useNotification } from "./useNotification";
import {
  getNotifications,
  markAsRead,
  markAllRead
} from "./notificationService";
import {
  connectWebSocket,
  disconnectWebSocket
} from "./websocketService";

const BellNotification = () => {
  const [open, setOpen] = useState(false);
  const [ring, setRing] = useState(false);

  const {
    bellNotifications,
    setBellNotifications,
    handleSocketEvent
  } = useNotification();

  const audioRef = useRef(null);
  const initialized = useRef(false); // 🔥 IMPORTANT

  useEffect(() => {

    // 🔥 prevent double execution
    if (initialized.current) return;
    initialized.current = true;

    console.log("BellNotification mounted");

    audioRef.current = new Audio("/notification.mp3");

    const load = async () => {
      const data = await getNotifications();
      setBellNotifications(data || []);
    };

    load();

    console.log("Calling connectWebSocket...");

    connectWebSocket((payload) => {
      console.log("WS MESSAGE:", payload);

      handleSocketEvent(payload);

      if (payload.eventType === "NEW") {
        setRing(true);
        setTimeout(() => setRing(false), 400);
        audioRef.current?.play().catch(() => {});
      }
    });

    return () => {
      disconnectWebSocket();
      initialized.current = false;
    };

  }, []);

  const handleRead = async (id) => {
    await markAsRead(id);
  };

  const handleClearAll = async () => {
    await markAllRead();
  };

  const unreadCount = bellNotifications.filter(
    (n) => !n.readStatus
  ).length;

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer ${
          ring ? "bell-ring" : ""
        }`}
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default BellNotification;