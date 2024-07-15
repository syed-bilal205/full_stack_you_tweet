/* eslint-disable react/prop-types */
import { useGetVideoCommentsQuery } from "./commentApiSlice";
import { Loader } from "../../components";
import { FaUserCircle } from "react-icons/fa";
import { useGetUserQuery } from "../user/userApiSlice";
import {
  UpdateComment,
  RemoveComment,
  ToggleCommentLike,
} from "../index";

import { Link } from "react-router-dom";

const VideoComments = ({ videoId }) => {
  const { data: user } = useGetUserQuery();
  const shouldFetchComments = videoId && videoId.trim().length > 0;
  const {
    data: comments,
    isLoading,
    isError,
  } = useGetVideoCommentsQuery({
    videoId: shouldFetchComments ? videoId : null,
  });

  if (isLoading) {
    return <Loader backgroundColor={"white"} />;
  }

  if (
    !shouldFetchComments ||
    isError ||
    !comments?.data ||
    comments.data.length === 0
  ) {
    return (
      <div className="mt-6">
        <h1 className="text-xl font-bold mb-4">Comments</h1>
        <p className="text-gray-600">No comments available.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      {comments.data.map((comment) => {
        const isOwner = comment.owner._id === user?.data?._id;
        const hasComment =
          comment.comment && comment.comment.trim().length > 0;

        return (
          <div
            key={comment._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mt-2">
              {comment.owner.avatar ? (
                <img
                  src={comment.owner.avatar}
                  alt="Avatar"
                  className="rounded-full w-12 h-12 mr-2"
                />
              ) : (
                <FaUserCircle className="text-gray-400 w-8 h-8 mr-2" />
              )}
              <div className="flex-1">
                <Link to={`/user/c/${comment.owner.username}`}>
                  <p className="text-sm text-gray-600 font-semibold">
                    {comment.owner.username}
                  </p>
                </Link>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <ToggleCommentLike commentId={comment._id} />
              </div>
            </div>
            <div className="mt-2">
              {!isOwner ? (
                <p className="text-base">{comment.comment}</p>
              ) : (
                hasComment && (
                  <div className="flex items-center mt-2 space-x-2">
                    <UpdateComment
                      commentId={comment._id}
                      currentComment={comment.comment}
                    />
                    <RemoveComment commentId={comment._id} />
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoComments;
