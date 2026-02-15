import { Navigate, Outlet } from "react-router";
import { useGetMeQuery } from "../../services/auth.js";

interface PermissionGuardProps {
  permission: string;
}

export default function PermissionGuard({ permission }: PermissionGuardProps) {
  const { data: user } = useGetMeQuery();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin bypasses all permission checks
  if (user.role.name === "admin") {
    return <Outlet />;
  }

  if (!user.permissions.includes(permission)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
