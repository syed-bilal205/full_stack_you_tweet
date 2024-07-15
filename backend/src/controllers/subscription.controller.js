import Subscription from "../models/subscription.model.js";
import {
  asyncHandler,
  ApiResponse,
  ApiError,
} from "../utils/index.js";
import { isValidObjectId, mongoose } from "mongoose";

/**
 * Toggle subscription for the given channel
 */
export const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  // Validate channel id
  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  // Check if user is already subscribed to the channel
  const subscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  // Unsubscribe if user is already subscribed
  if (subscription) {
    await Subscription.findByIdAndDelete(subscription._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Unsubscribed successfully"));
  }

  // Subscribe to the channel if user is not already subscribed
  const newSubscription = await Subscription.create({
    subscriber: req.user._id,
    channel: channelId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Subscribed successfully", newSubscription)
    );
});

/**
 * Get subscribers of a channel
 */
export const getUserChannelSubscribers = asyncHandler(
  async (req, res) => {
    const { channelId } = req.params;

    // Validate channel id
    if (!isValidObjectId(channelId)) {
      throw new ApiError(400, "Invalid channel id");
    }

    // Fetch subscribers of the channel
    const subscribersAggregate = await Subscription.aggregate([
      {
        $match: {
          channel: new mongoose.Types.ObjectId(channelId),
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          subscribers: { $push: "$subscriber" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "subscribers",
          foreignField: "_id",
          as: "subscribers",
          pipeline: [
            {
              $project: {
                username: 1,
                email: 1,
                fullName: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          subscribers: 1,
        },
      },
    ]);

    const subscribersCount =
      subscribersAggregate.length > 0
        ? subscribersAggregate[0]
        : null;

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Subscribers fetched", subscribersCount)
      );
  }
);

/**
 * Get channels subscribed by a user
 */
export const getSubscribedChannels = asyncHandler(
  async (req, res) => {
    const { subscriberId } = req.params;

    // Validate subscriber id
    if (!isValidObjectId(subscriberId)) {
      throw new ApiError(400, "Invalid subscriber id");
    }

    // Fetch channels subscribed by the user
    const subscribedChannels = await Subscription.aggregate([
      {
        $match: {
          subscriber: new mongoose.Types.ObjectId(subscriberId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "channel",
          foreignField: "_id",
          as: "channel",
          pipeline: [
            {
              $project: {
                username: 1,
                email: 1,
                fullName: 1,
              },
            },
          ],
        },
      },
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Subscribed channels fetched",
          subscribedChannels
        )
      );
  }
);
