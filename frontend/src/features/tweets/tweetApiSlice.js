import { api } from "../../app/api/api";

export const tweetApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTheTweets: builder.query({
      query: () => ({
        url: `/tweet`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        transformResponse: (response) => response.data,
      }),
      providesTags: ["Tweets"],
    }),
    PublishTweet: builder.mutation({
      query: (tweet) => ({
        url: `/tweet`,
        method: "POST",
        body: tweet,
      }),
      invalidatesTags: ["Tweets"],
    }),
    getUserTweets: builder.query({
      query: () => ({
        url: `/tweet/user-tweets`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        transformResponse: (response) => response.data,
      }),
      providesTags: ["Tweets"],
    }),
    updateTweet: builder.mutation({
      query: ({ text, tweetId }) => ({
        url: `/tweet/${tweetId}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: (result, error, { tweetId }) => [
        { type: "Tweets" },
        { type: "Tweet", id: tweetId },
      ],
    }),
    removeTweet: builder.mutation({
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { tweetId }) => [
        { type: "Tweets" },
        { type: "Tweet", id: tweetId },
      ],
    }),
    getTweetById: builder.query({
      query: (tweetId) => ({
        url: `/tweet/${tweetId}`,
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        transformResponse: (response) => response.data,
      }),
      providesTags: (result, error, { tweetId }) => [
        { type: "Tweet", id: tweetId },
      ],
    }),
  }),
});

export const {
  useGetAllTheTweetsQuery,
  usePublishTweetMutation,
  useGetUserTweetsQuery,
  useGetTweetByIdQuery,
  useUpdateTweetMutation,
  useRemoveTweetMutation,
} = tweetApiSlice;
