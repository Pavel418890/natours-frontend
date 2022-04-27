import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getLocalStorageDecryptedItem } from "../../utils/encryption";
import { userActions } from "../../features/user/userSlice";
import { Token } from "../../features/user/userSlice";



const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const access = JSON.parse(localStorage.getItem("access") as string);
    if (access) {
      headers.set("authorization", `Bearer ${access.token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // try do request with potential having token
  let result = await baseQuery(args, api, extraOptions);
  console.warn("step1 access token is valid", result);

  // not authorized ?
  if (result.error?.status === 401) {
    // try get refresh token
    const refresh = getLocalStorageDecryptedItem("refresh");
    if (refresh) {
      const body = { refresh: refresh.token };
      // send refresh-token request
      result = await baseQuery(
        { url: "/v1/auth/refresh-token/", method: "POST", body },
        api,
        extraOptions
      );
      console.warn("step2 refresh token is valid", result);

      // success ?
      const data = result?.data as { access: Token };
      if (data) {
        // store the new token
        const access = data.access;
        localStorage.setItem("access", JSON.stringify(access));
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
        console.warn("Token updated");
        console.warn("step3 access token is valid", result);
      }
    }
    if (result.error) {
      // logout and clear state and storage if no token or not valid
      console.warn(" step 4 user illuminated");
      api.dispatch(userActions.logout());
    }
  }

  return result.data
    ? { data: result.data as { access: Token } }
    : { error: result.error as FetchBaseQueryError };
};

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
  reducerPath: "baseApi",
  endpoints: () => ({}),
});
export const baseProtectedApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "baseProtectedApi",
  endpoints: () => ({}),
});
