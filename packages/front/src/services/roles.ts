import { api } from "./api.js";

export interface PermissionItem {
  id: number;
  name: string;
  description: string | null;
}

export interface RoleListItem {
  id: number;
  name: string;
  description: string | null;
  builtIn: boolean;
  userCount: number;
  permissions: PermissionItem[];
}

const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RoleListItem[], void>({
      query: () => "/roles",
      providesTags: ["Roles"],
    }),
    getRole: builder.query<RoleListItem, number>({
      query: (id) => `/roles/${id}`,
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<
      RoleListItem,
      { name: string; description?: string; permissionIds?: number[] }
    >({
      query: (body) => ({ url: "/roles", method: "POST", body }),
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation<
      RoleListItem,
      { id: number; name?: string; description?: string; permissionIds?: number[] }
    >({
      query: ({ id, ...body }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({ url: `/roles/${id}`, method: "DELETE" }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
