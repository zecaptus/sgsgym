import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@sgsgym/db";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersQuery } = api;
