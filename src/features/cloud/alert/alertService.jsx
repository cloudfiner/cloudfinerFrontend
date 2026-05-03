import axios from "axios";
import { getAccessToken, clearTokens } from "@/lib/authService";

const api = axios.create({
  baseURL: "http://localhost:8080/api/alerts",
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

// 🔹 GET ALERTS
export const getAlerts = async () => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.get("/all", {
      params: { type },
    });

    return res.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return [];
  }
};

// 🔹 CREATE ALERT
export const createAlert = async (threshold) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.post("/create", null, {
      params: { threshold, type },
    });

    return res.data?.data || null;
  } catch (error) {
    console.error("Create alert failed:", error);
    return null;
  }
};

// 🔹 DELETE ALERT
export const deleteAlert = async (id) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    await api.delete(`/delete/${id}`, {
      params: { type },
    });

    return true;
  } catch (error) {
    console.error("Delete alert failed:", error);
    return false;
  }
};

// 🔹 TOGGLE ALERT
export const toggleAlert = async (id) => {
  try {
    const token = getAccessToken();
    const type = token ? "real" : "demo";

    const res = await api.put(`/${id}/toggle`, null, {
      params: { type },
    });

    return res.data?.data || null;
  } catch (error) {
    console.error("Toggle alert failed:", error);
    return null;
  }
};

export default api;