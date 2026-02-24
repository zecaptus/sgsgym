import { useState } from "react";
import { useNavigate } from "react-router";
import { useIntl } from "react-intl";
import { useCreateBlogPostMutation } from "../../services/blog.js";
import { useGetCategoriesQuery } from "../../services/blog.js";
import TiptapEditor from "../../components/editor/TiptapEditor.js";

export default function AdminBlogNewPage() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [content, setContent] = useState<object>({});
  const [error, setError] = useState<string | null>(null);

  const { data: categories } = useGetCategoriesQuery();
  const [createPost, { isLoading }] = useCreateBlogPostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const post = await createPost({
        title,
        content,
        excerpt: excerpt || undefined,
        coverImage: coverImage || undefined,
        categoryId,
      }).unwrap();
      navigate(`/admin/blog/${post.id}/edit`);
    } catch {
      setError(formatMessage({ id: "error.generic" }));
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {formatMessage({ id: "admin.blog.newPost" })}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/admin/blog")}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← {formatMessage({ id: "admin.blog.backToList" })}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {formatMessage({ id: "admin.blog.postTitle" })}*
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            placeholder={formatMessage({ id: "admin.blog.postTitlePlaceholder" })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {formatMessage({ id: "admin.blog.excerpt" })}
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder={formatMessage({ id: "admin.blog.excerptPlaceholder" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {formatMessage({ id: "admin.blog.category" })}
            </label>
            <select
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">{formatMessage({ id: "admin.blog.noCategory" })}</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {formatMessage({ id: "admin.blog.coverImage" })}
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="https://…"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {formatMessage({ id: "admin.blog.content" })}*
          </label>
          <TiptapEditor content={null} onChange={setContent} />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading
              ? formatMessage({ id: "common.loading" })
              : formatMessage({ id: "admin.blog.saveDraft" })}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/blog")}
            className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
          >
            {formatMessage({ id: "common.cancel" })}
          </button>
        </div>
      </form>
    </div>
  );
}
