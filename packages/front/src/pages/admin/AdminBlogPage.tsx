import { Link } from "react-router";
import { useIntl } from "react-intl";
import { useGetBlogPostsQuery, useDeleteBlogPostMutation, usePublishBlogPostMutation } from "../../services/blog.js";

export default function AdminBlogPage() {
  const { formatMessage } = useIntl();
  const { data: posts, isLoading } = useGetBlogPostsQuery();
  const [deletePost] = useDeleteBlogPostMutation();
  const [publishPost] = usePublishBlogPostMutation();

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(formatMessage({ id: "admin.blog.deleteConfirm" }, { title }))) return;
    await deletePost(id);
  };

  const handleTogglePublish = async (id: number, published: boolean) => {
    await publishPost({ id, published: !published });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {formatMessage({ id: "admin.blog.title" })}
        </h1>
        <div className="flex gap-3">
          <Link
            to="/admin/blog/categories"
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm transition-colors"
          >
            {formatMessage({ id: "admin.blog.categories" })}
          </Link>
          <Link
            to="/admin/blog/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            {formatMessage({ id: "admin.blog.new" })}
          </Link>
        </div>
      </div>

      {isLoading && <p className="text-gray-400">{formatMessage({ id: "common.loading" })}</p>}

      {!isLoading && posts?.length === 0 && (
        <p className="text-gray-400">{formatMessage({ id: "admin.blog.noPosts" })}</p>
      )}

      <div className="space-y-3">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-5 py-4"
          >
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                    post.published ? "bg-green-400" : "bg-yellow-400"
                  }`}
                />
                <p className="text-white font-medium truncate">{post.title}</p>
              </div>
              <p className="text-xs text-gray-500">
                {post.category?.name && (
                  <span className="text-sgs-red mr-2">{post.category.name}</span>
                )}
                {post.author.name} ·{" "}
                {new Date(post.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleTogglePublish(post.id, post.published)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                  post.published
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                    : "bg-green-700 hover:bg-green-600 text-white"
                }`}
              >
                {post.published
                  ? formatMessage({ id: "admin.blog.unpublish" })
                  : formatMessage({ id: "admin.blog.publish" })}
              </button>
              <Link
                to={`/admin/blog/${post.id}/edit`}
                className="px-3 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
              >
                {formatMessage({ id: "common.edit" })}
              </Link>
              <button
                onClick={() => handleDelete(post.id, post.title)}
                className="px-3 py-1 rounded text-xs bg-red-800 hover:bg-red-700 text-white transition-colors"
              >
                {formatMessage({ id: "common.delete" })}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
