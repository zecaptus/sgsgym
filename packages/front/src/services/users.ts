import { api } from "./api.js";

export interface UserListItem {
  id: number;
  email: string;
  name: string | null;
  roleId: number;
  role: { id: number; name: string };
  createdAt: string;
}

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserListItem[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    updateUserRole: builder.mutation<
      UserListItem,
      { id: number; roleId: number }
    >({
      query: ({ id, roleId }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { roleId },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = usersApi;
