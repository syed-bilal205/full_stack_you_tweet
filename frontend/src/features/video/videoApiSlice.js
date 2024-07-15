import { api } from "../../app/api/api";

export const videoApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortType = "desc",
        query = "",
        userId = "",
      }) => ({
        url: `/video?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&query=${query}&userId=${userId}`,
        method: "GET",

        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        transformResponse: (response) => response.data,
      }),
      providesTags: (result, error, arg) =>
        result && result.data && Array.isArray(result.data.videos)
          ? [
              ...result.data.videos.map(({ id }) => ({
                type: "Videos",
                id,
              })),
              { type: "Videos", id: "LIST" },
            ]
          : [{ type: "Videos", id: "LIST" }],
    }),
    getSingleVideo: builder.query({
      query: (videoId) => ({
        url: `/video/${videoId}`,
        transformResponse: (response) => response.data,
      }),
      providesTags: (result, error, id) => [{ type: "Videos", id }],
    }),
    updateVideo: builder.mutation({
      query: (formData) => {
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }
        return {
          url: `video/${formData.videoId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Videos", id: videoId },
        { type: "Videos", id: "LIST" },
      ],
    }),
    publishedVideo: builder.mutation({
      query: (formData) => {
        const data = new FormData();
        for (const key in formData) {
          data.append(key, formData[key]);
        }
        return {
          url: `/video/publish`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Videos", id: "LIST" }],
    }),
    removeVideo: builder.mutation({
      query: (videoId) => ({
        url: `/video/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, videoId) => [
        { type: "Videos", id: videoId },
        { type: "Videos", id: "LIST" },
      ],
    }),
    unPublishedVideos: builder.query({
      query: () => ({
        url: `/video/unpublished-videos`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result && result.data && Array.isArray(result.data.videos)
          ? [
              ...result.data.videos.map(({ id }) => ({
                type: "UnpublishedVideos",
                id,
              })),
              { type: "UnpublishedVideos", id: "LIST" },
            ]
          : [{ type: "UnpublishedVideos", id: "LIST" }],
    }),
    togglePublishStatus: builder.mutation({
      query: ({ videoId }) => ({
        url: `/video/publish/${videoId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: "Videos", id: videoId },
        { type: "Videos", id: "LIST" },
        { type: "UnpublishedVideos", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useUpdateVideoMutation,
  useGetSingleVideoQuery,
  useRemoveVideoMutation,
  usePublishedVideoMutation,
  useUnPublishedVideosQuery,
  useTogglePublishStatusMutation,
} = videoApiSlice;
