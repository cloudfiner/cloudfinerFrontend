import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/queryClient";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import ChangePassword from "./features/auth/ChangePassword";

import Dashboard from "./features/dashboard/Dashboard";
import Analytics from "./features/cloud/analytics/Analytics";
import Settings from "./features/cloud/settings/Settings";

import AdminDashboard from "./features/admin/AdminDashboard";
import LandingPage from "./features/Home/LandingPage";

import ProtectedRoute from "./shared/ProtectedRoute";
import AdminRoute from "./shared/AdminRoute";
import RoleGuard from "./shared/RoleGuard";

import NotificationProvider from "./features/notifications/NotificationProvider";
import ToastRenderer from "./features/notifications/ToastRender";

import { AuthProvider } from "@/context/AuthContext";
import AwsConnectPage from "./features/aws/AwsConnectPage";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <ToastRenderer />

          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* AWS CONNECT (PROTECTED) */}
            <Route
              path="/connect-aws"
              element={
                <ProtectedRoute>
                  <AwsConnectPage />
                </ProtectedRoute>
              }
            />

            {/* USER */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
          path="/demo"
           element={<Dashboard />}
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                    <Settings />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>

        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
