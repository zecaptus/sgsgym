import { Link, Outlet } from "react-router";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useGetMeQuery, useLogoutMutation } from "../../services/auth.js";
import { api } from "../../services/api.js";

export default function AppLayout() {
  const { formatMessage } = useIntl();
  const { data: user } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const hasAdminAccess =
    user?.role.name === "admin" || user?.permissions.includes("admin:access");

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(api.util.resetApiState());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-sgs-darker border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-extrabold text-white uppercase tracking-wider">
              SGS <span className="text-sgs-red">Gym</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {formatMessage({ id: "nav.home" })}
              </Link>
              {user ? (
                <>
                  {hasAdminAccess && (
                    <Link
                      to="/admin"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {formatMessage({ id: "nav.admin" })}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {formatMessage({ id: "nav.logout" })}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {formatMessage({ id: "nav.login" })}
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-sgs-red hover:bg-sgs-red-dark text-white px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wider transition-colors"
                  >
                    {formatMessage({ id: "nav.signup" })}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
