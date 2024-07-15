import { useGetAllTheLikedVideoQuery } from "./likeApiSlice";
import { Loader } from "../../components";
import ReactPlayer from "react-player";
import { FaHeart, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const GetAllTheLikedVideos = () => {
  const {
    data: likedVideos,
    isLoading,
    isError,
    error,
  } = useGetAllTheLikedVideoQuery();

  const videos = likedVideos?.data;

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Liked Videos
      </h1>
      <div className="flex justify-center items-center min-h-[50vh]">
        {isLoading ? (
          <Loader backgroundColor={"white"} />
        ) : isError ? (
          <div className="text-red-500 text-center">
            Error: {error?.data?.message}
          </div>
        ) : videos?.length === 0 ? (
          <div className="text-center text-gray-500">
            <FaHeart className="w-12 h-12 mx-auto mb-4" />
            No liked videos
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos?.map(({ video }) => (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                <div className="relative pb-[56.25%] mb-4 rounded-lg overflow-hidden">
                  <ReactPlayer
                    url={video.videoFile}
                    className="absolute top-0 left-0 w-full h-full"
                    width="100%"
                    height="100%"
                    light={
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="object-cover w-full h-full"
                      />
                    }
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
                  {video.title}
                </h2>
                <p className="text-gray-700 mb-2 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
                  <div className="flex items-center">
                    <FaVideo className="w-5 h-5 mr-1" />
                    <span>{video.duration} mins</span>
                  </div>
                  <span>{video.views} views</span>
                </div>
                <div className="flex items-center">
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.fullName}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <Link to={`/user/c/${video.owner.username}`}>
                    <p className="text-gray-500 text-sm">
                      By {video.owner.username}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllTheLikedVideos;
