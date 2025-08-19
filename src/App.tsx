import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/LoginPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";

import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import EmployeesList from "./features/employees/EmployeesList";
import CustomersList from "./features/customers/CustomersList";

export default function App() {
  return (
    <Routes>
      {/* Route login công khai */}
      <Route path="/login" element={<LoginPage />} />

      {/* Các route bên trong app, cần login */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Mặc định redirect sang dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute allow={["ADMIN", "MANAGER", "SALES"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="employees"
          element={
            <ProtectedRoute allow={["ADMIN", "MANAGER"]}>
              <EmployeesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="customers"
          element={
            <ProtectedRoute allow={["MANAGER", "SALES"]}>
              <CustomersList />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Nếu route không hợp lệ → quay login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
