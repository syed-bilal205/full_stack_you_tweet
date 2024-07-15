import {
  useUnPublishedVideosQuery,
  useRemoveVideoMutation,
  useTogglePublishStatusMutation,
} from "./videoApiSlice";
import { Loader } from "../../components";
import ReactPlayer from "react-player";
import {
  FaRegClock,
  FaEye,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UnpublishedVideos = () => {
  const { data, isError, error, isLoading } =
    useUnPublishedVideosQuery();
  const [removeVideo, { isLoading: deleteLoading }] =
    useRemoveVideoMutation();
  const [togglePublishStatus, { isLoading: publishLoading }] =
    useTogglePublishStatusMutation();

  const [playingVideo, setPlayingVideo] = useState(null);
  const navigate = useNavigate();

  const handlePlay = (videoId) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      const result = await removeVideo(videoId);
      console.log(result);
    } catch (err) {
      console.error("Failed to delete video:", err);
    }
  };

  const handleToggle = async (videoId) => {
    try {
      const result = await togglePublishStatus({ videoId });
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error(`Error while publishing the video ${error}`);
    }
  };

  if (isLoading) return <Loader backgroundColor={"white"} />;

  if (isError)
    return (
      <div className="text-center text-gray-700">
        {error?.data?.message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Unpublished Videos
      </h1>
      {data && data.data && data.data.length > 0 ? (
        data.data.map((video) => (
          <div
            key={video._id}
            className="video-card bg-white shadow-md rounded-lg mb-6 p-4">
            <h2 className="text-2xl font-semibold mb-2">
              {video.title}
            </h2>
            <div onClick={() => handlePlay(video._id)}>
              <ReactPlayer
                url={video.videoFile}
                controls={playingVideo === video._id}
                width="100%"
                height="auto"
                light={
                  <img
                    src={video.thumbnail}
                    alt={`${video.title} thumbnail`}
                    className="rounded-lg mb-2"
                  />
                }
                className="mb-4"
              />
            </div>
            <p className="text-gray-700 mb-2">{video.description}</p>
            <div className="flex items-center text-gray-600 mb-2">
              <FaRegClock className="mr-2" />
              <p>Duration: {video.duration} seconds</p>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <FaEye className="mr-2" />
              <p>Views: {video.views}</p>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <FaCalendarAlt className="mr-2" />
              <p>
                Created At:{" "}
                {new Date(video.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <FaSyncAlt className="mr-2" />
              <p>
                Last Updated:{" "}
                {new Date(video.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => handleDelete(video._id)}
                disabled={deleteLoading}>
                Delete
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handleToggle(video._id)}
                disabled={publishLoading}>
                Publish
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center h-screen text-gray-700">
          {!isLoading && !isError && "No unpublished videos found."}
        </div>
      )}
    </div>
  );
};

export default UnpublishedVideos;
