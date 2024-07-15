import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import {
  useGetTweetByIdQuery,
  useRemoveTweetMutation,
} from "./tweetApiSlice";
import { useGetUserQuery } from "../user/userApiSlice";
import { FaUserCircle } from "react-icons/fa";

const TweetDetails = () => {
  const tweetId = useParams().tweetId;
  const { data, isLoading, isError, error } =
    useGetTweetByIdQuery(tweetId);
  const { data: user } = useGetUserQuery();
  const navigate = useNavigate();
  const [removeTweet, { isLoading: removeLoading }] =
    useRemoveTweetMutation();

  if (isLoading) {
    return <Loader backgroundColor={"white"} />;
  }

  const tweet = data?.data;
  //   console.log(tweet);
  if (!tweet) {
    return <div>Error: Video not found</div>;
  }
  const isAuthor = tweet?.owner._id === user.data._id;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
  };

  const handleUpdateTweet = () => {
    navigate(`/tweet/update/${tweetId}`);
  };

  const handleRemove = async () => {
    try {
      await removeTweet(tweetId);
      navigate("/tweet");
    } catch (error) {
      console.error(`Error while deleting the tweet ${error}`);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Tweet Details</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          {tweet.owner.avatar ? (
            <img
              src={tweet.owner.avatar}
              alt={tweet.owner.username}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-400" />
          )}
          <p className="ml-2 font-bold">{tweet.owner.username}</p>
        </div>
        <p className="text-gray-700">{tweet.text}</p>
        <p className="text-gray-500">
          Posted on: {formatDate(tweet.createdAt)}
        </p>
        <p className="text-gray-500">
          Last updated: {formatDate(tweet.updatedAt)}
        </p>
        {isAuthor && (
          <>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpdateTweet}
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Update Tweet
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRemove}
                className="w-full bg-gradient-to-r from-red-700 via-red-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300"
                disabled={removeLoading}>
                Delete Tweet
              </button>
            </div>
          </>
        )}
        {isError && (
          <div className="text-red-500">{error.message}</div>
        )}
      </div>
    </div>
  );
};
export default TweetDetails;
