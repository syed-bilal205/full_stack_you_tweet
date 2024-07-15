import { api } from "../../app/api/api";

export const subscriptionApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleSubscription: builder.mutation({
      query: ({ channelId }) => ({
        url: `/subscription/toggle-subscription/${channelId}`,
        method: "POST",
      }),
      invalidatesTags: ["subscription"],
    }),
    getUserSubscribers: builder.query({
      query: ({ channelId }) => ({
        url: `/subscription/user-channel-subscribers/${channelId}`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    getUserSubscribedChannels: builder.query({
      query: ({ subscriberId }) => ({
        url: `/subscription/subscribed-channels/${subscriberId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useToggleSubscriptionMutation,
  useGetUserSubscribedChannelsQuery,
  useGetUserSubscribersQuery,
  useLazyGetUserSubscribersQuery,
} = subscriptionApiSlice;
