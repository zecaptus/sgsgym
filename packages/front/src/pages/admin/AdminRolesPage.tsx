import { useState } from "react";
import { Link } from "react-router";
import { useIntl } from "react-intl";
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} from "../../services/roles.js";

export default function AdminRolesPage() {
  const { formatMessage } = useIntl();
  const { data: roles, isLoading } = useGetRolesQuery();
  const [createRole] = useCreateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const [newRoleName, setNewRoleName] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    await createRole({ name: newRoleName.trim() });
    setNewRoleName("");
  };

  const handleDelete = (id: number) => {
    if (confirm(formatMessage({ id: "admin.roles.deleteConfirm" }))) {
      deleteRole(id);
    }
  };

  if (isLoading) {
    return (
      <p className="text-gray-400">
        {formatMessage({ id: "common.loading" })}
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {formatMessage({ id: "admin.roles.title" })}
      </h1>

      <form onSubmit={handleCreate} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder={formatMessage({ id: "admin.roles.name" })}
          className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {formatMessage({ id: "admin.roles.create" })}
        </button>
      </form>

      {!roles?.length ? (
        <p className="text-gray-500">
          {formatMessage({ id: "admin.roles.noRoles" })}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">
                  {formatMessage({ id: "common.id" })}
                </th>
                <th className="px-6 py-3">
                  {formatMessage({ id: "admin.roles.name" })}
                </th>
                <th className="px-6 py-3">
                  {formatMessage({ id: "admin.roles.permissions" })}
                </th>
                <th className="px-6 py-3">
                  {formatMessage({ id: "admin.roles.users" })}
                </th>
                <th className="px-6 py-3">
                  {formatMessage({ id: "admin.roles.actions" })}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-gray-800/60 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-400">
                    {role.id}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {role.name}
                    {role.builtIn && (
                      <span className="ml-2 text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded">
                        {formatMessage({ id: "admin.roles.builtIn" })}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {role.permissions.map((p) => p.name).join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm">{role.userCount}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/admin/roles/${role.id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-sm"
                    >
                      {formatMessage({ id: "admin.roles.edit" })}
                    </Link>
                    {!role.builtIn && (
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        {formatMessage({ id: "admin.roles.delete" })}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
