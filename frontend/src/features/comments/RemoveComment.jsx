/* eslint-disable react/prop-types */
import { useRemoveCommentMutation } from "./commentApiSlice";

import { Loader } from "../../components";
import { FaTrash } from "react-icons/fa";

const RemoveComment = ({ commentId }) => {
  const [removeComment, { isLoading, isError, error }] =
    useRemoveCommentMutation();

  const handleRemove = async () => {
    try {
      await removeComment({ commentId });
    } catch (error) {
      console.error(`Error while removing comment: ${error}`);
    }
  };

  return (
    <div className="flex items-center">
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <>
          <button
            onClick={handleRemove}
            className="text-red-500 flex items-center gap-1">
            <FaTrash />
          </button>
          {isError && (
            <div className="text-red-500 ml-2">
              {error?.data?.message || "Error removing comment."}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RemoveComment;
