import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleVideoQuery,
  useRemoveVideoMutation,
} from "./videoApiSlice";
import { Loader } from "../../components";
import ReactPlayer from "react-player";
import { FaUserCircle } from "react-icons/fa";
import { useGetUserQuery } from "../user/userApiSlice";
import {
  VideoComments,
  CreateComment,
  ToggleVideoLike,
  AddVideo,
} from "../index";

const VideoDetail = () => {
  const { videoId } = useParams();
  const { data, isLoading, isError, error } =
    useGetSingleVideoQuery(videoId);
  const { data: user } = useGetUserQuery();
  const [removeVideo, { isLoading: removeLoading }] =
    useRemoveVideoMutation();
  const navigate = useNavigate();

  if (isLoading) return <Loader backgroundColor="white" />;
  if (isError) return <div>Error: {error?.data?.message}</div>;

  const video = data?.data;

  if (!video) {
    return <div>Error: Video not found</div>;
  }

  const isOwner = video.owner._id === user?.data?._id;

  const handleUpdateVideo = () => {
    navigate(`/video/update/${videoId}`);
  };

  const handleRemoveVideo = async () => {
    try {
      await removeVideo(videoId);
      navigate("/");
    } catch (error) {
      console.error(`Error while deleting the video ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {video.title}
        </h1>
        <div className="relative overflow-hidden aspect-w-16 aspect-h-9 mb-6">
          <ReactPlayer
            url={video.videoFile}
            className="react-player"
            width="100%"
            height="100%"
            controls={true}
            light={<img src={video.thumbnail} alt={video.title} />}
          />
        </div>
        <p className="text-lg mb-6 text-gray-700">
          {video.description}
        </p>
        <div className="flex items-center text-gray-600 mb-6">
          <p className="text-sm">Duration: {video.duration}s</p>
          <p className="ml-6 text-sm">Views: {video.views}</p>
          <div className="ml-auto flex space-x-4">
            <ToggleVideoLike videoId={videoId} />
            <AddVideo videoId={videoId} />
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-6">
          <div className="flex items-center">
            {video.owner.avatar ? (
              <img
                src={video.owner.avatar}
                alt=""
                className="rounded-full w-10 h-10 mr-3"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-10 h-10 mr-3" />
            )}
            <p className="text-sm">{video.owner.username}</p>
          </div>
          <p className="ml-auto text-sm">
            Created At:{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-8">
          <CreateComment videoId={videoId} />
          <VideoComments videoId={videoId} />
        </div>
        {isOwner && (
          <div className="mt-8 space-y-4">
            <button
              onClick={handleUpdateVideo}
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
              Update Video
            </button>
            <button
              onClick={handleRemoveVideo}
              className="w-full bg-gradient-to-r from-red-700 via-red-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300"
              disabled={removeLoading}>
              Delete Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
