import { api } from "../../app/api/api";

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getChannelStats: builder.query({
      query: () => ({
        url: "/dashboard/channel-stats",
        method: "GET",
      }),
    }),
    getChannelVideos: builder.query({
      query: () => ({
        url: "/dashboard/channel-videos",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetChannelStatsQuery, useGetChannelVideosQuery } =
  dashboardApiSlice;
