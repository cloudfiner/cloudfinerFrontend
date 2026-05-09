import axios from "axios";
import { getAccessToken, clearTokens } from "@/lib/authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ FIX
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// 🔹 Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    // ✅ Send token if exists (no mode logic)
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

    // 🔒 401 → logout
    if (status === 401) {
      clearTokens();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

// ================= TELEGRAM APIs =================

import api from "@/lib/api";
import { getAccessToken } from "@/lib/authService";

// ================= TELEGRAM APIs =================

// 🔹 CONNECT TELEGRAM
export const connectTelegram = async () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const res = await api.get("/api/telegram/connect");
    return res.data;
  } catch (err) {
    console.error("Connect error:", err.message);
    return null;
  }
};

// 🔹 CHECK STATUS
export const checkTelegramStatus = async () => {
  const token = getAccessToken();
  if (!token) return { connected: false };

  try {
    const res = await api.get("/api/telegram/status");
    return res.data;
  } catch (err) {
    console.error("Status error:", err.message);
    return { connected: false };
  }
};

// 🔹 DISCONNECT TELEGRAM
export const disconnectTelegram = async () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const res = await api.put("/api/telegram/disconnect");
    return res.data;
  } catch (err) {
    console.error("Disconnect error:", err.message);
    return null;
  }
};

export default api;