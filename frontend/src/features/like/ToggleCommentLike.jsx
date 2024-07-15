/* eslint-disable react/prop-types */
import { useToggleCommentLikeMutation } from "./likeApiSlice";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ToggleCommentLike = ({ commentId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const [toggleCommentLike, { isError, error }] =
    useToggleCommentLikeMutation();

  const handleLikeComment = async () => {
    try {
      await toggleCommentLike({ commentId });
      const likedComments =
        JSON.parse(localStorage.getItem("likedComments")) || [];

      if (likedComments.includes(commentId)) {
        const updatedComments = likedComments.filter(
          (id) => id !== commentId
        );
        localStorage.setItem(
          "likedComments",
          JSON.stringify(updatedComments)
        );
        setIsLiked(false);
      } else {
        likedComments.push(commentId);
        localStorage.setItem(
          "likedComments",
          JSON.stringify(likedComments)
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error while liking comment", error);
    }
  };

  useEffect(() => {
    const likedComments =
      JSON.parse(localStorage.getItem("likedComments")) || [];
    setIsLiked(likedComments.includes(commentId));
  }, [commentId]);

  return (
    <div
      onClick={handleLikeComment}
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

export default ToggleCommentLike;
