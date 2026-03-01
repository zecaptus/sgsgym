import { Link } from "react-router";
import { useIntl } from "react-intl";
import { useGetBlogPostsQuery } from "../services/blog.js";

export default function BlogListPage() {
  const { formatMessage } = useIntl();
  const { data: posts, isLoading } = useGetBlogPostsQuery();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold uppercase tracking-wider text-white mb-2">
        {formatMessage({ id: "blog.title" })}
      </h1>
      <p className="text-gray-400 mb-10">{formatMessage({ id: "blog.subtitle" })}</p>

      {isLoading && (
        <p className="text-gray-400">{formatMessage({ id: "common.loading" })}</p>
      )}

      {!isLoading && posts?.length === 0 && (
        <p className="text-gray-400">{formatMessage({ id: "blog.noPosts" })}</p>
      )}

      <div className="grid gap-8">
        {posts?.map((post) => (
          <article
            key={post.id}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-6">
              {post.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-sgs-red">
                  {post.category.name}
                </span>
              )}
              <h2 className="text-xl font-bold text-white mt-1 mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-sgs-red transition-colors">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.author.name}</span>
                <span>
                  {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
