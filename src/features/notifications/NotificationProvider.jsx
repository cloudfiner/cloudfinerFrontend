


import { createContext, useContext, useState } from "react";

// Export context
export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [bellNotifications, setBellNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  const handleSocketEvent = (data) => {
    if (!data || !data.eventType) return;

    // NEW notification
    if (data.eventType === "NEW") {
      setBellNotifications((prev) => {
        // prevent duplicate notifications
        const exists = prev.some((n) => n.id === data.id);
        if (exists) return prev;

        return [data, ...prev];
      });

      const id = Date.now();

      // add toast
      setToasts((prev) => [
        ...prev,
        {
          id,
          message: data.message,
          priority: data.priority || "INFO"
        }
      ]);

      // auto remove toast
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);

      // browser push notification (safe check)
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.hidden
      ) {
        try {
          new Notification(data.message);
        } catch (e) {
          console.error("Browser notification error:", e);
        }
      }
    }

    // MARK SINGLE AS READ
    if (data.eventType === "READ") {
      setBellNotifications((prev) =>
        prev.map((n) =>
          n.id === data.id ? { ...n, readStatus: true } : n
        )
      );
    }

    // MARK ALL AS READ
    if (data.eventType === "ALL_READ") {
      setBellNotifications((prev) =>
        prev.map((n) => ({ ...n, readStatus: true }))
      );
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        bellNotifications,
        setBellNotifications,
        handleSocketEvent,
        toasts
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

// Hook
export const useNotification = () => useContext(NotificationContext);