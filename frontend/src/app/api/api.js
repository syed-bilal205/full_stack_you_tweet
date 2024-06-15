import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import {
  setCredentials,
  logout,
} from "../../features/auth/authSlice";

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    // console.log("token" + token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      { url: "/user/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { accessToken, refreshToken } = refreshResult.data.data;
      cookies.set("accessToken", accessToken, { path: "/" });
      cookies.set("refreshToken", refreshToken, { path: "/" });
      api.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      console.log("refresh token not available");
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  reducerPath: "api",
  endpoints: () => ({}),
});
