import { api } from "./api.js";

export interface MeResponse {
  id: number;
  email: string;
  name: string | null;
  role: { id: number; name: string };
  permissions: string[];
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    login: builder.mutation<MeResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    signup: builder.mutation<MeResponse, SignupRequest>({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth", "Users", "Roles", "Permissions"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
