import axios from "axios";
import { getAccessToken, setAccessToken, clearTokens } from "./authService";


const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔹 Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    // ✅ Token present → send Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("INTERCEPTOR ERROR:", error.response?.status);

    // 🔒 401 → try refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;
try {
  const res = await axios.post(
    `${BASE_URL}/api/auth/refresh`,
    {},
    { withCredentials: true }
  );

  const newToken = res.data.accessToken;

  setAccessToken(newToken);

  originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
  return api(originalRequest);

} catch (err) {
        //  Refresh failed → logout
        clearTokens();
        window.location.replace("/login");

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;