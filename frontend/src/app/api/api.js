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
  baseUrl: "http://localhost:8000/api",
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
    // console.log(
    //   "Access token expired, attempting to refresh token..."
    // );
    const refreshResult = await baseQuery(
      { url: "/user/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    // console.log("Refresh token response:", refreshResult);

    if (refreshResult.error) {
      console.error("Error refreshing token:", refreshResult.error);
      api.dispatch(logout());
      return result;
    }

    if (refreshResult.data && refreshResult.data.data) {
      try {
        const { accessToken, refreshToken } = refreshResult.data.data;
        // console.log(
        //   "New access Token:",
        //   accessToken,
        //   "New refresh Token:",
        //   refreshToken
        // );
        cookies.set("accessToken", accessToken, {
          path: "/",
          httpOnly: true,
          sameSite: "Strict",
        });
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
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
