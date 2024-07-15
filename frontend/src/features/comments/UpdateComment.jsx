/* eslint-disable react/prop-types */
import { useUpdateCommentMutation } from "./commentApiSlice";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const UpdateComment = ({ commentId, currentComment }) => {
  const [updateComment, { isLoading, isError, error }] =
    useUpdateCommentMutation();
  const [editMode, setEditMode] = useState(false);
  const [updatedComment, setUpdatedComment] =
    useState(currentComment);

  const handleChange = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateComment({
        commentId,
        comment: updatedComment,
      });
      setEditMode(false);
    } catch (error) {
      console.error(`Error while updating comment ${error}`);
    }
  };

  return (
    <div className="flex items-center">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          {!editMode ? (
            <>
              <p className="text-lg">{currentComment}</p>
              <button
                onClick={() => setEditMode(true)}
                className="text-gray-700  ml-2  flex items-center gap-1">
                <FaEdit />
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdateSubmit} className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Update Comment
                </label>
                <textarea
                  onChange={handleChange}
                  value={updatedComment}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="3"
                  placeholder="Update your comment here"
                />
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="bg-gray-700 text-white py-1 px-3 rounded ">
                  <FaEdit />
                </button>
                {isError && (
                  <div className="text-red-500 ml-2">
                    {error?.data?.message ||
                      "Error updating comment."}
                  </div>
                )}
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateComment;
