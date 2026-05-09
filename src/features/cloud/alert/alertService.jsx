import axios from "axios";
import { getAccessToken, clearTokens } from "@/lib/authService";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/alerts`, // ✅ FIX
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🔹 Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    // ✅ Only send token if exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // ✅ If unauthorized → logout
    if (status === 401) {
      clearTokens();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

// ================= API METHODS =================

// ================= ALERT APIs =================

// 🔹 GET ALERTS
export const getAlerts = async () => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.get("/api/alerts/all", {
      params: { type },
    });

    return res.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch alerts:", error.message);
    return [];
  }
};

// 🔹 CREATE ALERT
export const createAlert = async (threshold) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.post("/api/alerts/create", null, {
      params: { threshold, type },
    });

    return res.data?.data || null;
  } catch (error) {
    console.error("Create alert failed:", error.message);
    return null;
  }
};

// 🔹 DELETE ALERT
export const deleteAlert = async (id) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    await api.delete(`/api/alerts/delete/${id}`, {
      params: { type },
    });

    return true;
  } catch (error) {
    console.error("Delete alert failed:", error.message);
    return false;
  }
};

// 🔹 TOGGLE ALERT
export const toggleAlert = async (id) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.put(`/api/alerts/${id}/toggle`, null, {
      params: { type },
    });

    return res.data?.data || null;
  } catch (error) {
    console.error("Toggle alert failed:", error.message);
    return null;
  }
};

export default api;