import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useIntl } from "react-intl";
import { useGetRoleQuery, useUpdateRoleMutation } from "../../services/roles.js";
import { useGetPermissionsQuery } from "../../services/permissions.js";

export default function AdminRoleEditPage() {
  const { id } = useParams<{ id: string }>();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { data: role, isLoading: roleLoading } = useGetRoleQuery(Number(id));
  const { data: allPermissions, isLoading: permsLoading } =
    useGetPermissionsQuery();
  const [updateRole, { isLoading: saving }] = useUpdateRoleMutation();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (role) {
      setSelectedIds(new Set(role.permissions.map((p) => p.id)));
    }
  }, [role]);

  const togglePermission = (permId: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(permId)) {
        next.delete(permId);
      } else {
        next.add(permId);
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!role) return;
    await updateRole({
      id: role.id,
      permissionIds: Array.from(selectedIds),
    });
    navigate("/admin/roles");
  };

  if (roleLoading || permsLoading) {
    return (
      <p className="text-gray-400">
        {formatMessage({ id: "common.loading" })}
      </p>
    );
  }

  if (!role) {
    return (
      <p className="text-red-400">
        {formatMessage({ id: "error.notFound.title" })}
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/roles")}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {formatMessage({ id: "admin.roleEdit.back" })}
        </button>
        <h1 className="text-3xl font-bold">
          {formatMessage({ id: "admin.roleEdit.title" })} — {role.name}
        </h1>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {formatMessage({ id: "admin.roleEdit.permissionsLabel" })}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {allPermissions?.map((perm) => (
          <label
            key={perm.id}
            className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-lg p-3 cursor-pointer hover:border-gray-600 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedIds.has(perm.id)}
              onChange={() => togglePermission(perm.id)}
              className="accent-indigo-500 w-4 h-4"
            />
            <div>
              <div className="text-sm font-medium">{perm.name}</div>
              {perm.description && (
                <div className="text-xs text-gray-400">{perm.description}</div>
              )}
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition-colors"
      >
        {saving
          ? formatMessage({ id: "common.loading" })
          : formatMessage({ id: "admin.roleEdit.save" })}
      </button>
    </div>
  );
}
