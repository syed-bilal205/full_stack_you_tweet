/* eslint-disable react/prop-types */
import { useCreateCommentsMutation } from "./commentApiSlice";
import { Loader } from "../../components";
import { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";

const CreateComment = ({ videoId }) => {
  const [createComments, { isLoading, isError, error }] =
    useCreateCommentsMutation();
  const [addComment, setAddComment] = useState("");

  const handleChange = (e) => {
    setAddComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!addComment.trim()) {
      alert("Please provide a comment.");
      return;
    }
    try {
      await createComments({
        videoId,
        comment: addComment,
      });
      setAddComment("");
    } catch (error) {
      console.error(`Error while creating comments ${error}`);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4 flex items-center">
        <FaCommentAlt className="mr-2" /> Add Comments
      </h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              type="text"
              onChange={handleChange}
              value={addComment}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write your comment here"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300 flex items-center justify-center space-x-2">
              <FaCommentAlt />
              <span>Post Comment</span>
            </button>
          </div>
        </form>
      )}
      {isError && (
        <div className="text-red-500 text-center mt-4">
          {error?.data?.message || "Error posting comment."}
        </div>
      )}
    </div>
  );
};

export default CreateComment;
