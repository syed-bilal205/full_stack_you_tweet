import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  logout,
} from "../../features/auth/authSlice";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery(
      { url: import.meta.env.VITE_REFRESH_TOKEN, method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.error) {
      console.error("Error refreshing token:", refreshResult.error);
      api.dispatch(logout());
      return result;
    }

    if (refreshResult.data && refreshResult.data.data) {
      try {
        const { accessToken, refreshToken } = refreshResult.data.data;

        cookies.set("accessToken", accessToken, {
          path: "/",
          sameSite: "Strict",
        });
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          sameSite: "Strict",
        });
        api.dispatch(setCredentials({ accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        console.error(
          "Failed to parse refresh token response:",
          error
        );
        api.dispatch(logout());
      }
    } else {
      console.error(
        "Invalid refresh token response format:",
        refreshResult
      );
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User", "Users", "Video", "Videos", "Tweet", "Tweets"],
  endpoints: () => ({}),
});
