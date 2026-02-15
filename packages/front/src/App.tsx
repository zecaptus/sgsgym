import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./components/layout/AppLayout.js";
import AdminLayout from "./components/layout/AdminLayout.js";
import AuthGuard from "./components/guards/AuthGuard.js";
import GuestGuard from "./components/guards/GuestGuard.js";
import PermissionGuard from "./components/guards/PermissionGuard.js";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import ForbiddenPage from "./pages/ForbiddenPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.js";
import AdminUsersPage from "./pages/admin/AdminUsersPage.js";
import AdminRolesPage from "./pages/admin/AdminRolesPage.js";
import AdminRoleEditPage from "./pages/admin/AdminRoleEditPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />

          {/* Guest-only routes */}
          <Route element={<GuestGuard />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AuthGuard />}>
            <Route element={<PermissionGuard permission="admin:access" />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="roles" element={<AdminRolesPage />} />
                <Route path="roles/:id" element={<AdminRoleEditPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
