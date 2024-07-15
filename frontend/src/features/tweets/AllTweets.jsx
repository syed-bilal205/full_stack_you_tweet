/* eslint-disable react/prop-types */
import {
  useGetAllTheTweetsQuery,
  useGetUserTweetsQuery,
} from "./tweetApiSlice";
import { Loader } from "../../components";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useState } from "react";
import CreateTweet from "./CreateTweet";
import { Link } from "react-router-dom";
import { ToggleTweetLike } from "../index";

const AllTweets = () => {
  const {
    data: allTweetsData,
    isLoading: isAllTweetsLoading,
    isError: isAllTweetsError,
    error: allTweetsError,
  } = useGetAllTheTweetsQuery();

  const {
    data: userTweetsData,
    isLoading: isUserTweetsLoading,
    isError: isUserTweetsError,
    error: userTweetsError,
  } = useGetUserTweetsQuery();

  const allTweets = allTweetsData?.data || [];
  const userTweets = userTweetsData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserTweets, setShowUserTweets] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleTweets = () => {
    setShowUserTweets(!showUserTweets);
  };

  const renderTweets = (tweets) => {
    if (!tweets.length) {
      return <p className="text-gray-500">No tweets available.</p>;
    }
    return tweets.map((tweet) => (
      <div key={tweet._id} className="p-4 bg-white rounded shadow-md">
        <div className="flex items-center mb-4">
          <Link to={`/user/c/${tweet.owner.username}`}>
            {tweet.owner.avatar ? (
              <img
                src={tweet.owner.avatar}
                alt={tweet.owner.username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-400" />
            )}
            <p className="ml-2 font-semibold">
              {tweet.owner.username}
            </p>
          </Link>
        </div>
        <Link to={`/tweet/${tweet._id}`}>
          <p className="text-gray-700">{tweet.text}</p>
        </Link>
        <p className="text-gray-600">
          Created at: {new Date(tweet.createdAt).toLocaleString()}
        </p>
        <div className="mt-2">
          <ToggleTweetLike tweetId={tweet._id} />
        </div>
      </div>
    ));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      <h1 className="text-3xl font-bold mb-4">Tweets</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleToggleTweets}
          className="bg-gray-300 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300">
          {showUserTweets ? "Show All Tweets" : "Show My Tweets"}
        </button>
      </div>
      {isAllTweetsLoading || isUserTweetsLoading ? (
        <Loader backgroundColor={"white"} />
      ) : isAllTweetsError ? (
        <p className="text-red-600">
          Error:{" "}
          {allTweetsError?.data?.message ||
            "An unexpected error occurred"}
        </p>
      ) : isUserTweetsError && showUserTweets ? (
        <p className="text-red-600">
          Error:{" "}
          {userTweetsError?.data?.message ||
            "An unexpected error occurred"}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {showUserTweets && userTweets.length === 0 ? (
            <p className="text-gray-500">You have not tweeted yet.</p>
          ) : (
            renderTweets(showUserTweets ? userTweets : allTweets)
          )}
        </div>
      )}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-600 transition duration-300">
        <FaPlus className="w-6 h-6" />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Create New Tweet
            </h2>
            <CreateTweet onClose={handleCloseModal} />
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTweets;
