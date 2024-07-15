import { api } from "../../app/api/api";

export const commentApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getVideoComments: builder.query({
      query: ({ videoId }) => ({
        url: `comment/${videoId}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
    createComments: builder.mutation({
      query: ({ videoId, comment }) => ({
        url: `/comment/${videoId}`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, comment }) => ({
        url: `/comment/${commentId}`,
        method: "PATCH",
        body: { comment },
      }),
      invalidatesTags: ["Comments"],
    }),
    removeComment: builder.mutation({
      query: ({ commentId }) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetVideoCommentsQuery,
  useCreateCommentsMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentApiSlice;
