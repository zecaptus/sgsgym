import { Navigate, Outlet } from "react-router";
import { useGetMeQuery } from "../../services/auth.js";
import { useIntl } from "react-intl";

export default function GuestGuard() {
  const { data: user, isLoading } = useGetMeQuery();
  const intl = useIntl();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        {intl.formatMessage({ id: "common.loading" })}
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
