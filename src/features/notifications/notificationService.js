import api from "@/lib/api";
import { getAccessToken } from "@/lib/authService";

// 🔹 GET all notifications
export const getNotifications = async () => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.get("/api/notifications", {
      params: { type },
    });

    return res.data || [];
  } catch (error) {
    console.error("GET notifications failed:", error);
    return [];
  }
};

// 🔹 MARK single notification as read
export const markAsRead = async (id) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    await api.put(`/api/notifications/${id}/read`, null, {
      params: { type },
    });
  } catch (error) {
    console.error("MARK READ failed:", error);
  }
};

// 🔹 MARK all notifications as read
export const markAllRead = async () => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    await api.put("/api/notifications/read-all", null, {
      params: { type },
    });
  } catch (error) {
    console.error("MARK ALL READ failed:", error);
  }
};

// 🔹 GET unread count
export const getUnreadCount = async () => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.get("/api/notifications/unread-count", {
      params: { type },
    });

    return res.data || 0;
  } catch (error) {
    console.error("Unread count fetch failed:", error);
    return 0;
  }
};