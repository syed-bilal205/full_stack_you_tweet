import { useGetAllLikedTweetsQuery } from "./likeApiSlice";
import { Loader } from "../../components";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const GetAllLikedTweets = () => {
  const {
    data: likedTweets,
    isError,
    error,
    isLoading,
  } = useGetAllLikedTweetsQuery();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-8">
        Liked Tweets
      </h1>
      <div className="overflow-hidden">
        {isLoading ? (
          <Loader backgroundColor="white" />
        ) : isError ? (
          <div className="text-red-500 text-center py-4">
            Error: {error?.data?.message}
          </div>
        ) : likedTweets.length === 0 ? (
          <div className="text-center py-8">
            <FaHeart className="text-gray-400 w-16 h-16 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No liked Tweets available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedTweets.map(({ tweet }) => (
              <div
                key={tweet._id}
                className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={tweet?.owner?.avatar}
                    alt={tweet?.owner?.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <Link to={`/user/c/${tweet?.owner?.username}`}>
                      <p className="text-gray-700 font-semibold">
                        {tweet?.owner?.username}
                      </p>
                    </Link>
                    <p className="text-gray-500 text-sm">
                      {new Date(tweet.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800">{tweet.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllLikedTweets;
