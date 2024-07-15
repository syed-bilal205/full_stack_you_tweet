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
      providesTags: (result) =>
        result
          ? [{ type: "Users", id: result.id }]
          : [{ type: "Users", id: "CURRENT_USER" }],
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
      invalidatesTags: [{ type: "Users", id: "CURRENT_USER" }],
    }),
    updateUserAvatar: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }
        return {
          url: "/user/update-avatar",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Users", id: "CURRENT_USER" }],
    }),
    updateUserCoverImage: builder.mutation({
      query: (credentials) => {
        const formData = new FormData();
        for (const key in credentials) {
          formData.append(key, credentials[key]);
        }
        return {
          url: "/user/update-cover",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Users", id: "CURRENT_USER" }],
    }),
    getUserProfile: builder.query({
      query: (username) => ({
        url: `/user/c/${username}`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
    getWatchHistory: builder.query({
      query: () => ({
        url: "/user/history",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserQuery,
  useChangePasswordMutation,
  useUpdateUserAccountDetailsMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserCoverImageMutation,
  useGetUserProfileQuery,
  useGetWatchHistoryQuery,
} = userApiSlice;
