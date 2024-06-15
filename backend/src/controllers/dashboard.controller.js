import Videos from "../models/video.model.js";
import Likes from "../models/like.model.js";
import Subscriptions from "../models/subscription.model.js";
import {
  asyncHandler,
  ApiResponse,
  ApiError,
} from "../utils/index.js";

/**
 * Get channel statistics
 */
export const getChannelStats = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  // Check if the user is authenticated
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Get the subscriber count
  const subscriberCount = await Subscriptions.find({
    subscriber: userId,
  }).select("channel");

  // Get the video count and total video views for the subscriber's channels
  const channelIds = subscriberCount.map((sub) => sub.channel);
  const videoCount = await Videos.find({
    channel: { $in: channelIds },
  }).count();
  const totalVideoViews = await Videos.aggregate([
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  // Calculate the stats
  const stats = {
    videoCount,
    totalVideoViews: totalVideoViews.length
      ? totalVideoViews[0].totalViews
      : 0,
    likeCount: await Likes.find({ user: userId }).count(),
    subscriberCount,
  };

  // Return the stats
  return res.status(200).json(new ApiResponse(200, stats));
});

/**
 * Get the videos of the user's subscriptions
 */
export const getChannelVideos = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  // Check if the user is authenticated
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Get the subscriber count
  const subscriberCount = await Subscriptions.find({
    subscriber: userId,
  }).select("channel");

  // Get the video count and total video views for the subscriber's channels
  const channelIds = subscriberCount.map((sub) => sub.channel);
  const videos = await Videos.find({
    channel: { $in: channelIds },
  }).populate("channel");

  // Return the videos
  return res.status(200).json(new ApiResponse(200, videos));
});
