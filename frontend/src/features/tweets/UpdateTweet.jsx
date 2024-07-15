import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { useUpdateTweetMutation } from "./tweetApiSlice";
import { useState } from "react";
import { FaPen } from "react-icons/fa";

const UpdateTweet = () => {
  const tweetId = useParams().tweetId;
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [updateTweet, { isLoading, isError, error }] =
    useUpdateTweetMutation();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleUpdateTweet = async (e) => {
    e.preventDefault();
    try {
      await updateTweet({ text, tweetId });
      navigate("/tweet");
    } catch (error) {
      console.error(`Error while updating the tweet ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Update Tweet
        </h1>
        {isLoading ? (
          <Loader backgroundColor={"white"} />
        ) : (
          <form onSubmit={handleUpdateTweet}>
            <div className="flex items-center mb-4 border border-gray-300 rounded-lg">
              <FaPen className="ml-3 text-gray-500" />
              <input
                type="text"
                value={text}
                onChange={handleChange}
                required
                placeholder="Update your tweet..."
                className="flex-1 p-2 text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300 flex items-center justify-center gap-2">
                <FaPen /> Update Tweet
              </button>
            </div>
            {isError && (
              <div className="text-red-500 text-center mt-4">
                {error?.data?.message}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateTweet;
