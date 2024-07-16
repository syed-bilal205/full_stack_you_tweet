import { api } from "../../app/api/api";

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getChannelStats: builder.query({
      query: () => ({
        url: "/dashboard/channel-stats",
        method: "GET",
      }),
      invalidatesTags: ["dashboard"],
    }),
    getChannelVideos: builder.query({
      query: () => ({
        url: "/dashboard/channel-videos",
        method: "GET",
      }),
      invalidatesTags: ["dashboard"],
    }),
  }),
});

export const { useGetChannelStatsQuery, useGetChannelVideosQuery } =
  dashboardApiSlice;
