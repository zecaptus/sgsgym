import { useIntl } from "react-intl";
import { useGetUsersQuery } from "../../services/users.js";
import { useGetRolesQuery } from "../../services/roles.js";
import { useGetMeQuery } from "../../services/auth.js";

export default function AdminDashboardPage() {
  const { formatMessage } = useIntl();
  const { data: me } = useGetMeQuery();
  const { data: users } = useGetUsersQuery();

  const canReadRoles =
    me?.role.name === "admin" || me?.permissions.includes("roles:read");
  const { data: roles } = useGetRolesQuery(undefined, { skip: !canReadRoles });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {formatMessage({ id: "admin.dashboard.title" })}
      </h1>
      <p className="text-gray-400 mb-8">
        {formatMessage({ id: "admin.dashboard.welcome" })}
      </p>
      <div className="flex gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 min-w-48">
          <div className="text-3xl font-bold text-indigo-400">
            {users?.length ?? "-"}
          </div>
          <div className="text-gray-400 text-sm mt-1">
            {formatMessage({ id: "admin.dashboard.usersCount" })}
          </div>
        </div>
        {canReadRoles && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 min-w-48">
            <div className="text-3xl font-bold text-indigo-400">
              {roles?.length ?? "-"}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {formatMessage({ id: "admin.dashboard.rolesCount" })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
