import { api } from "./api.js";

export interface Category {
  id: number;
  name: string;
  slug: string;
  _count?: { posts: number };
  createdAt: string;
  updatedAt: string;
}

export interface PostAuthor {
  id: number;
  name: string | null;
}

export interface PostSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
  category: Pick<Category, "id" | "name" | "slug"> | null;
}

export interface BlogPost extends PostSummary {
  // content is Tiptap JSON
  content: object;
}

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Categories
    getCategories: builder.query<Category[], void>({
      query: () => "/blog/categories",
      providesTags: ["BlogCategories"],
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: (body) => ({ url: "/blog/categories", method: "POST", body }),
      invalidatesTags: ["BlogCategories"],
    }),
    updateCategory: builder.mutation<Category, { id: number; name: string }>({
      query: ({ id, ...body }) => ({ url: `/blog/categories/${id}`, method: "PUT", body }),
      invalidatesTags: ["BlogCategories"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({ url: `/blog/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["BlogCategories"],
    }),

    // Posts
    getBlogPosts: builder.query<PostSummary[], void>({
      query: () => "/blog/posts",
      providesTags: ["BlogPosts"],
    }),
    getBlogPost: builder.query<BlogPost, string>({
      query: (slug) => `/blog/posts/${slug}`,
      providesTags: ["BlogPosts"],
    }),
    createBlogPost: builder.mutation<
      BlogPost,
      { title: string; content: object; excerpt?: string; coverImage?: string; categoryId?: number }
    >({
      query: (body) => ({ url: "/blog/posts", method: "POST", body }),
      invalidatesTags: ["BlogPosts"],
    }),
    updateBlogPost: builder.mutation<
      BlogPost,
      {
        id: number;
        title: string;
        content: object;
        excerpt?: string;
        coverImage?: string;
        categoryId?: number | null;
      }
    >({
      query: ({ id, ...body }) => ({ url: `/blog/posts/${id}`, method: "PUT", body }),
      invalidatesTags: ["BlogPosts"],
    }),
    publishBlogPost: builder.mutation<BlogPost, { id: number; published: boolean }>({
      query: ({ id, published }) => ({
        url: `/blog/posts/${id}/publish`,
        method: "PATCH",
        body: { published },
      }),
      invalidatesTags: ["BlogPosts"],
    }),
    deleteBlogPost: builder.mutation<void, number>({
      query: (id) => ({ url: `/blog/posts/${id}`, method: "DELETE" }),
      invalidatesTags: ["BlogPosts"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  usePublishBlogPostMutation,
  useDeleteBlogPostMutation,
} = blogApi;
