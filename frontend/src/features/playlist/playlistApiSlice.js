import { api } from "../../app/api/api";

export const playlistApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createPlayList: builder.mutation({
      query: (data) => ({
        url: `/playlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Playlists"],
    }),
    getUserPlaylists: builder.query({
      query: () => ({
        url: `/playlist`,
        method: "GET",
      }),
      providesTags: ["Playlists"],
    }),
    deletePlaylist: builder.mutation({
      query: ({ playlistId }) => ({
        url: `/playlist/${playlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlists"],
    }),
    updatePlaylist: builder.mutation({
      query: ({ playlistId, data }) => ({
        url: `/playlist/${playlistId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Playlists"],
    }),
    addVideo: builder.mutation({
      query: ({ playlistId, videoId }) => ({
        url: `/playlist/${playlistId}/${videoId}`,
        method: "POST",
      }),
      invalidatesTags: ["Playlist"],
    }),
    removeVideoFromPlaylist: builder.mutation({
      query: ({ playlistId, videoId }) => ({
        url: `/playlist/${playlistId}/${videoId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePlayListMutation,
  useGetUserPlaylistsQuery,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useAddVideoMutation,
  useRemoveVideoFromPlaylistMutation,
} = playlistApiSlice;
