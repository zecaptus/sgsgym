import { api } from "./api.js";

export interface PermissionItem {
  id: number;
  name: string;
  description: string | null;
}

const permissionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<PermissionItem[], void>({
      query: () => "/permissions",
      providesTags: ["Permissions"],
    }),
  }),
});

export const { useGetPermissionsQuery } = permissionsApi;
