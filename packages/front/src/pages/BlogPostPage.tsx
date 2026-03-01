import { useParams, Link } from "react-router";
import { useIntl } from "react-intl";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import { useGetBlogPostQuery } from "../services/blog.js";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { formatMessage } = useIntl();
  const { data: post, isLoading, isError } = useGetBlogPostQuery(slug ?? "");

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-gray-400">
        {formatMessage({ id: "common.loading" })}
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-gray-400">{formatMessage({ id: "error.notFound.message" })}</p>
        <Link to="/blog" className="text-sgs-red hover:underline mt-4 inline-block">
          {formatMessage({ id: "blog.backToList" })}
        </Link>
      </div>
    );
  }

  const html = generateHTML(post.content as Parameters<typeof generateHTML>[0], [
    StarterKit,
    Image,
    LinkExt,
  ]);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {post.category && (
        <Link
          to="/blog"
          className="text-xs font-semibold uppercase tracking-wider text-sgs-red hover:underline"
        >
          {post.category.name}
        </Link>
      )}
      <h1 className="text-4xl font-extrabold uppercase tracking-wider text-white mt-2 mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <span>{post.author.name}</span>
        <span>·</span>
        <span>
          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full rounded-xl object-cover max-h-96 mb-8"
        />
      )}

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-12 pt-8 border-t border-gray-700">
        <Link to="/blog" className="text-sgs-red hover:underline text-sm">
          ← {formatMessage({ id: "blog.backToList" })}
        </Link>
      </div>
    </article>
  );
}
