import { useGetChannelVideosQuery } from "./dashboardApiSlice";
import { MdPlayCircle } from "react-icons/md";
import { Loader } from "../../components";

const ChannelVideo = () => {
  const { data, isError, error, isLoading } =
    useGetChannelVideosQuery();

  if (isLoading) {
    return <Loader backgroundColor={"white"} />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error: {error?.data?.message}
      </p>
    );
  }

  const videos = data?.data || [];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {videos?.map((video) => (
        <div
          key={video._id}
          className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold mb-2">{video.title}</h3>
          <p className="text-gray-700 mb-4">{video.description}</p>
          <a
            href={video.videoFile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 flex items-center">
            <MdPlayCircle className="mr-2" />
            Watch Video
          </a>
        </div>
      ))}
    </div>
  );
};
export default ChannelVideo;
