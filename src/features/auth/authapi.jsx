import api from "@/lib/api";
import {
  setAccessToken,
  clearTokens,
} from "@/lib/authService";

/**
 * LOGIN USER
 */
export const loginUser = async (email, password) => {
  try {
    const res = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      },
      {
        timeout: 30000,
      }
    );

    const data = res?.data;

    if (!data || !data.accessToken) {
      return {
        success: false,
        message: "Invalid server response. Please try again.",
      };
    }

    // Save token (single source of truth)
    setAccessToken(data.accessToken);

    return {
      success: true,
      data,
    };

  } catch (error) {
    console.error("Login error:", error);

    if (!error.response) {
      return {
        success: false,
        message: "Unable to connect to server. Please try again later.",
      };
    }

    if (error.response?.data?.error) {
      return {
        success: false,
        message: error.response.data.error,
      };
    }

    if (error.response?.status === 401) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

/**
 * LOGOUT USER
 */
export const logoutUser = async () => {
  try {
    await api.post("/api/auth/logout");
  } catch (e) {
    console.error("Logout error:", e);
  } finally {
    clearTokens();
    window.location.replace("/login"); // safe redirect
  }
};

/**
 * REGISTER USER
 */
export const registerUser = async (formData) => {
  try {
    const res = await api.post("/api/auth/register", formData);

    return {
      success: true,
      data: res.data,
    };

  } catch (error) {
    return handleError(error, "Registration failed");
  }
};

/**
 * REGISTER ADMIN
 */
export const registerAdmin = async (formData) => {
  try {
    const res = await api.post("/api/auth/register-admin", formData);

    return {
      success: true,
      data: res.data,
    };

  } catch (error) {
    return handleError(error, "Admin registration failed");
  }
};

/**
 * GET ALL USERS
 */
export const getAllUsers = async (role, status) => {
  try {
    let url = "/api/auth/admin/users";

    const params = new URLSearchParams();
    if (role) params.append("role", role);
    if (status) params.append("status", status);

    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }

    const response = await api.get(url);

    return { success: true, data: response.data };

  } catch (error) {
    return handleError(error, "Failed to fetch users");
  }
};

/**
 * GET USER BY EMAIL
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/api/auth/${email}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Failed to fetch user");
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (id) => {
  try {
    await api.delete(`/api/auth/users/${id}`);
    return { success: true };
  } catch (error) {
    return handleError(error, "Delete failed");
  }
};

/**
 * ACTIVATE USER
 */
export const activateUser = async (id) => {
  try {
    await api.put(`/api/auth/users/${id}/activate`);
    return { success: true };
  } catch (error) {
    return handleError(error, "Activation failed");
  }
};

/**
 * GET LOGS
 */
export const getLogs = async () => {
  try {
    const response = await api.get("/activitylog/admin/logs");
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Failed to fetch logs");
  }
};

/**
 * CHANGE PASSWORD
 */
export const changePassword = async (form) => {
  try {
    const response = await api.post("/api/auth/change-password", form);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Change password failed");
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/api/auth/forgot-password", { email });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Forgot password failed");
  }
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (form) => {
  try {
    const response = await api.post("/api/auth/reset-password", form);
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, "Reset password failed");
  }
};

/**
 * COMMON ERROR HANDLER
 */
const handleError = (error, defaultMessage) => {
  if (error.response) {
    return {
      success: false,
      message:
        error.response.data?.message ||
        error.response.data ||
        defaultMessage,
    };
  }

  if (error.request) {
    return {
      success: false,
      message: "Server not responding",
    };
  }

  return {
    success: false,
    message: error.message || defaultMessage,
  };
};