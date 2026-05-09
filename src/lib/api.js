import axios from "axios";
import { getAccessToken, setAccessToken, clearTokens } from "./authService";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 60000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/auth/refresh", {}, { withCredentials: true });
        const newToken = res.data.accessToken;
        setAccessToken(newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        clearTokens();
        window.location.replace("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const warmUpServer = async () => {
  try {
    await api.get("/api/health");
  } catch (_) {}
};

export default api;