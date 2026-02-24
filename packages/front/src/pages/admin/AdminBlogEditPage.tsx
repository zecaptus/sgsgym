import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useIntl } from "react-intl";
import type { JSONContent } from "@tiptap/core";
import {
  useGetBlogPostsQuery,
  useUpdateBlogPostMutation,
  usePublishBlogPostMutation,
  useGetCategoriesQuery,
  type PostSummary,
} from "../../services/blog.js";
import TiptapEditor from "../../components/editor/TiptapEditor.js";

export default function AdminBlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const { formatMessage } = useIntl();

  const { data: posts } = useGetBlogPostsQuery();
  const post = posts?.find((p) => p.id === Number(id));

  if (!post) {
    return <p className="text-gray-400">{formatMessage({ id: "common.loading" })}</p>;
  }

  // Key by post.id so the form resets when navigating between posts
  return <AdminBlogEditForm key={post.id} post={post} />;
}

function AdminBlogEditForm({ post }: { post: PostSummary }) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const { data: categories } = useGetCategoriesQuery();
  const [updatePost, { isLoading: isSaving }] = useUpdateBlogPostMutation();
  const [publishPost, { isLoading: isPublishing }] = usePublishBlogPostMutation();

  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post.coverImage ?? "");
  const [categoryId, setCategoryId] = useState<number | null>(post.category?.id ?? null);
  const [content, setContent] = useState<JSONContent>({});
  const [published, setPublished] = useState(post.published);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Fetch full post content via slug
  const [fullContent, setFullContent] = useState<JSONContent | null>(null);
  useEffect(() => {
    fetch(`/api/blog/posts/${post.slug}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data: { content: JSONContent; published: boolean }) => {
        setFullContent(data.content);
        setPublished(data.published);
      });
  }, [post.slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    try {
      await updatePost({
        id: post.id,
        title,
        content,
        excerpt: excerpt || undefined,
        coverImage: coverImage || undefined,
        categoryId,
      }).unwrap();
      setSaved(true);
    } catch {
      setError(formatMessage({ id: "error.generic" }));
    }
  };

  const handleTogglePublish = async () => {
    await publishPost({ id: post.id, published: !published });
    setPublished((p) => !p);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {formatMessage({ id: "admin.blog.editPost" })}
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={isPublishing}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              published
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "bg-green-700 hover:bg-green-600 text-white"
            }`}
          >
            {published
              ? formatMessage({ id: "admin.blog.unpublish" })
              : formatMessage({ id: "admin.blog.publish" })}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/blog")}
            className="text-gray-400 hover:text-white text-sm"
          >
            ← {formatMessage({ id: "admin.blog.backToList" })}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
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
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {formatMessage({ id: "admin.blog.category" })}
            </label>
            <select
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
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
          {fullContent !== null ? (
            <TiptapEditor content={fullContent} onChange={setContent} />
          ) : (
            <div className="border border-gray-600 rounded-lg p-4 text-gray-500 text-sm">
              {formatMessage({ id: "common.loading" })}
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {saved && (
          <p className="text-green-400 text-sm">{formatMessage({ id: "admin.blog.saved" })}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
          >
            {isSaving
              ? formatMessage({ id: "common.loading" })
              : formatMessage({ id: "common.save" })}
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
