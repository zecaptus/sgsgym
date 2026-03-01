import { useState } from "react";
import { useNavigate } from "react-router";
import { useIntl } from "react-intl";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../services/blog.js";

export default function AdminBlogCategoriesPage() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createCategory({ name: newName.trim() }).unwrap();
      setNewName("");
    } catch {
      setError(formatMessage({ id: "admin.blog.categories.createError" }));
    }
  };

  const handleUpdate = async (id: number) => {
    setError(null);
    try {
      await updateCategory({ id, name: editName.trim() }).unwrap();
      setEditId(null);
      setEditName("");
    } catch {
      setError(formatMessage({ id: "error.generic" }));
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(formatMessage({ id: "admin.blog.categories.deleteConfirm" }, { name }))) return;
    await deleteCategory(id);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {formatMessage({ id: "admin.blog.categories.title" })}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/admin/blog")}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← {formatMessage({ id: "admin.blog.backToList" })}
        </button>
      </div>

      {/* Create form */}
      <form onSubmit={handleCreate} className="flex gap-2 mb-8">
        <input
          type="text"
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={formatMessage({ id: "admin.blog.categories.namePlaceholder" })}
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-colors"
        >
          {formatMessage({ id: "common.create" })}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {isLoading && <p className="text-gray-400">{formatMessage({ id: "common.loading" })}</p>}

      <div className="space-y-2">
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
          >
            {editId === cat.id ? (
              <input
                type="text"
                autoFocus
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUpdate(cat.id);
                  if (e.key === "Escape") setEditId(null);
                }}
                className="flex-1 bg-gray-700 border border-gray-500 rounded px-2 py-1 text-white mr-3 focus:outline-none"
              />
            ) : (
              <div className="flex-1">
                <span className="text-white font-medium">{cat.name}</span>
                {cat._count !== undefined && (
                  <span className="ml-2 text-xs text-gray-500">
                    {cat._count.posts} article{cat._count.posts !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )}
            <div className="flex gap-2 flex-shrink-0">
              {editId === cat.id ? (
                <>
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="px-3 py-1 rounded text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                  >
                    {formatMessage({ id: "common.save" })}
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                  >
                    {formatMessage({ id: "common.cancel" })}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(cat.id);
                      setEditName(cat.name);
                    }}
                    className="px-3 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                  >
                    {formatMessage({ id: "common.edit" })}
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="px-3 py-1 rounded text-xs bg-red-800 hover:bg-red-700 text-white transition-colors"
                  >
                    {formatMessage({ id: "common.delete" })}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
