import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User, TokenPair } from "../../features/user/userSlice";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  token: TokenPair;
}

export interface SignUpRequest {
  email: string;
  password: string;
  password_confirm: string;
}

export interface SignUpResponse {
  token: TokenPair;
  user: User;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string }),
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: "/v1/auth/signin/",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (enteredData) => ({
        url: "/v1/users/signup/",
        method: "POST",
        body: enteredData,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
