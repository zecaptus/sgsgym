import { NavLink, Outlet } from "react-router";
import { FormattedMessage } from "react-intl";
import { useGetMeQuery } from "../../services/auth.js";

interface NavItem {
  to: string;
  label: string;
  end: boolean;
  permission?: string;
}

const navItems: NavItem[] = [
  { to: "/admin", label: "nav.dashboard", end: true },
  { to: "/admin/users", label: "nav.users", end: false },
  { to: "/admin/roles", label: "nav.roles", end: false, permission: "roles:read" },
];

export default function AdminLayout() {
  const { data: me } = useGetMeQuery();
  const isAdmin = me?.role.name === "admin";

  const visibleItems = navItems.filter(
    (item) => !item.permission || isAdmin || me?.permissions.includes(item.permission),
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          <FormattedMessage id="nav.admin" />
        </h2>
        <nav className="flex flex-col gap-1">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <FormattedMessage id={item.label} />
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
