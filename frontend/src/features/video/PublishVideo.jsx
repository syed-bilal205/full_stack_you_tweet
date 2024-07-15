import { usePublishedVideoMutation } from "./videoApiSlice";
import { Loader } from "../../components";
import { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PublishVideo = () => {
  const [publishedVideo, { isLoading, isError, error }] =
    usePublishedVideoMutation();
  const [publishVideo, setPublishVideo] = useState({
    title: "",
    description: "",
    isPublished: true,
    thumbnail: null,
    videoFile: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setPublishVideo((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handlePublishedVideo = async (e) => {
    e.preventDefault();
    try {
      await publishedVideo(publishVideo);
      // console.log(result);
      setPublishVideo({
        title: "",
        description: "",
        thumbnail: null,
        videoFile: null,
      });
      navigate("/");
    } catch (error) {
      console.error(`Error while publishing the video ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Publish Video</h1>
        {isLoading ? (
          <Loader backgroundColor="white" />
        ) : (
          <form onSubmit={handlePublishedVideo} className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={publishVideo.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={publishVideo.description}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Is Published
              </label>
              <input
                type="checkbox"
                name="isPublished"
                checked={publishVideo.isPublished}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="thumbnail"
                  className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm text-gray-800 transition duration-300 ease-in-out">
                  <BsUpload className="inline-block mr-2" />
                  Upload
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
                {publishVideo.thumbnail && (
                  <p className="text-gray-600">
                    {publishVideo.thumbnail.name}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Video
              </label>
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="videoFile"
                  className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm text-gray-800 transition duration-300 ease-in-out">
                  <BsUpload className="inline-block mr-2" />
                  Upload
                </label>
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  onChange={handleChange}
                  accept="video/*"
                  className="hidden"
                />
                {publishVideo.videoFile && (
                  <p className="text-gray-600">
                    {publishVideo.videoFile.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Publish Video
              </button>
            </div>
            {isError && (
              <div className="text-red-500 text-center">
                {error?.message}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default PublishVideo;
