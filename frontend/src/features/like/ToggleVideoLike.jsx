/* eslint-disable react/prop-types */
import {
  useToggleVideoLikeMutation,
  useGetAllTheLikedVideoQuery,
} from "./likeApiSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

const ToggleVideoLike = ({ videoId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [toggleVideoLike, { isError, error }] =
    useToggleVideoLikeMutation();
  const { data: allLikedVideos } = useGetAllTheLikedVideoQuery();

  const likedVideoIds = allLikedVideos?.data?.map(
    (item) => item?.video?._id
  );
  useEffect(() => {
    if (likedVideoIds && likedVideoIds.includes(videoId)) {
      setIsLiked(true);
      // console.log("true");
    } else {
      setIsLiked(false);
      // console.log("false");
    }
  }, [videoId, likedVideoIds]);

  const handleLikeVideo = async () => {
    try {
      await toggleVideoLike({ videoId });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(`error while liking the video ${error}`);
    }
  };

  return (
    <div
      onClick={handleLikeVideo}
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
export default ToggleVideoLike;
