import { api } from "../../app/api/api";
import { setCredentials, logout } from "./authSlice";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }
        return {
          url: "/user/register",
          method: "POST",
          body: formData,
        };
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setCredentials({
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        body: {},
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          setTimeout(() => {
            dispatch(api.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/user/refresh-token",
        method: "POST",
        body: {},
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
