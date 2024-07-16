import { useGetWatchHistoryQuery } from "./userApiSlice";
import { Loader } from "../../components";
import ReactPlayer from "react-player";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const WatchHistory = () => {
  const { data, isLoading, isError, error } =
    useGetWatchHistoryQuery();

  const videos = data?.data;

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-3xl font-bold mb-4">Watch History</h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : isError ? (
        <p className="text-red-600">Error: {error?.data?.message}</p>
      ) : videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden">
              <ReactPlayer
                url={item.videoFile}
                width="100%"
                height="240px"
                controls={true}
                light={
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="rounded-t-lg w-full"
                    style={{ maxHeight: "240px", objectFit: "cover" }}
                  />
                }
                playIcon={
                  <AiFillPlayCircle className="text-4xl text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                }
                className="react-player"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <Link to={`/user/c/${item.owner[0].username}`}>
                  <img
                    src={item.owner[0].avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover mr-2"
                  />
                  <p className="text-gray-600">
                    Owned by: {item.owner[0].username}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No watch history available</p>
      )}
    </div>
  );
};

export default WatchHistory;
