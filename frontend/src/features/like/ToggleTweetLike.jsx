/* eslint-disable react/prop-types */
import {
  useToggleTweetLikeMutation,
  useGetAllLikedTweetsQuery,
} from "./likeApiSlice";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ToggleTweetLike = ({ tweetId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [toggleTweetLike, { isError, error }] =
    useToggleTweetLikeMutation();
  const { data: allLikedTweet } = useGetAllLikedTweetsQuery();

  const likedTweetsIds = allLikedTweet?.map(
    (item) => item?.tweet?._id
  );

  useEffect(() => {
    if (likedTweetsIds && likedTweetsIds.includes(tweetId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedTweetsIds, tweetId]);

  const handleLikeTweet = async () => {
    try {
      await toggleTweetLike({ tweetId });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(`Error while liking the tweet ${error}`);
    }
  };

  return (
    <div
      onClick={handleLikeTweet}
      className="cursor-pointer flex items-center">
      {isLiked ? (
        <AiFillHeart className="text-red-500" size={24} />
      ) : (
        <AiOutlineHeart className="text-red-500" size={24} />
      )}
      {isError && (
        <p className="ml-2 text-red-500">
          Error: {error?.data?.message}
        </p>
      )}
    </div>
  );
};
export default ToggleTweetLike;
