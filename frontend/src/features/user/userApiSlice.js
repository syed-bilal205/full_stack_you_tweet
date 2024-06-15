import { api } from "../../app/api/api";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user/current-user",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/user/change-password",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateUserAccountDetails: builder.mutation({
      query: (credentials) => ({
        url: "/user/update-account-details",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    updateUserAvatar: builder.mutation({
      query: (credentials) => ({
        url: "/user/update-avatar",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useUpdateUserAccountDetailsMutation,
  useUpdateUserAvatarMutation,
} = userApiSlice;
