import { FormattedMessage, useIntl } from "react-intl";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "../../services/users.js";
import { useGetRolesQuery } from "../../services/roles.js";
import { useGetMeQuery } from "../../services/auth.js";

export default function AdminUsersPage() {
  const intl = useIntl();
  const { data: users, isLoading } = useGetUsersQuery();
  const { data: roles } = useGetRolesQuery();
  const { data: me } = useGetMeQuery();
  const [updateRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const isAdmin = me?.role.name === "admin";
  const canUpdate = isAdmin || me?.permissions.includes("users:update");
  const canDelete = isAdmin || me?.permissions.includes("users:delete");

  const handleRoleChange = (userId: number, roleId: number) => {
    updateRole({ id: userId, roleId });
  };

  const handleDelete = (userId: number) => {
    if (confirm(intl.formatMessage({ id: "admin.users.deleteConfirm" }))) {
      deleteUser(userId);
    }
  };

  if (isLoading) {
    return (
      <p className="text-gray-400">
        <FormattedMessage id="common.loading" />
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <FormattedMessage id="admin.users.title" />
      </h1>

      {!users?.length ? (
        <p className="text-gray-500">
          <FormattedMessage id="admin.users.noUsers" />
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">
                  <FormattedMessage id="common.id" />
                </th>
                <th className="px-6 py-3">
                  <FormattedMessage id="admin.users.name" />
                </th>
                <th className="px-6 py-3">
                  <FormattedMessage id="admin.users.email" />
                </th>
                <th className="px-6 py-3">
                  <FormattedMessage id="admin.users.role" />
                </th>
                {(canUpdate || canDelete) && (
                  <th className="px-6 py-3">
                    <FormattedMessage id="admin.users.actions" />
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-800/60 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-400">
                    {user.id}
                  </td>
                  <td className="px-6 py-4">{user.name ?? "-"}</td>
                  <td className="px-6 py-4 text-indigo-400">{user.email}</td>
                  <td className="px-6 py-4">
                    {canUpdate ? (
                      <select
                        value={user.roleId}
                        onChange={(e) =>
                          handleRoleChange(user.id, Number(e.target.value))
                        }
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                      >
                        {roles?.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm">{user.role.name}</span>
                    )}
                  </td>
                  {(canUpdate || canDelete) && (
                    <td className="px-6 py-4">
                      {canDelete && user.id !== me?.id && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          <FormattedMessage id="admin.users.delete" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
