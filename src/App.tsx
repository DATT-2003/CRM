
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./features/auth/components/LoginPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./features/dashboard/components/DashboardPage";
import EmployeesList from "./features/employees/components/EmployeesPage";
import CustomersList from "./features/customers/components/customersPage";
import OpportunityDetail from "./features/opportunities/components/OpportunityDetail";
import OpportunitiesPage from "./features/opportunities/components/OpportunitiesPage";
import CustomerDetail from "./features/customers/components/customerDetail";

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
            path="opportunities"
            element={
              <ProtectedRoute allow={["MANAGER", "SALES"]}>
                <OpportunitiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="opportunities/:id"
            element={
              <ProtectedRoute allow={["MANAGER", "SALES"]}>
                <OpportunityDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="customers/:id"
            element={
              <ProtectedRoute allow={["MANAGER", "SALES"]}>
                <CustomerDetail />
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
