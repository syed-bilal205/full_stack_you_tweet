import { api } from "../../app/api/api";

export const likeApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTheLikedVideo: builder.query({
      query: () => ({
        url: `/like`,
        method: "GET",
      }),
      providesTags: ["like"],
    }),
    toggleVideoLike: builder.mutation({
      query: ({ videoId }) => ({
        url: `/like/${videoId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "like" }],
    }),
    toggleTweetLike: builder.mutation({
      query: ({ tweetId }) => ({
        url: `/like/tweet/${tweetId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "like" }],
    }),
    toggleCommentLike: builder.mutation({
      query: ({ commentId }) => ({
        url: `/like/comment/${commentId}`,
        method: "POST",
      }),
    }),
    getAllLikedTweets: builder.query({
      query: () => ({
        url: "/like/tweets",
        method: "GET",
      }),
      providesTags: ["like"],
    }),
  }),
});

export const {
  useGetAllTheLikedVideoQuery,
  useToggleVideoLikeMutation,
  useToggleTweetLikeMutation,
  useToggleCommentLikeMutation,
  useGetAllLikedTweetsQuery,
} = likeApiSlice;
