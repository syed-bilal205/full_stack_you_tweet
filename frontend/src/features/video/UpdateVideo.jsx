import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useUpdateVideoMutation } from "./videoApiSlice";
import { Loader } from "../../components";

const UpdateVideoThumbnail = () => {
  const { videoId } = useParams();
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    videoId: videoId,
  });

  const [updateVideo, { isLoading, isError, error, isSuccess }] =
    useUpdateVideoMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setVideoForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setVideoForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      await updateVideo(videoForm);
      // console.log(result);
      navigate("/");
      setVideoForm({
        title: "",
        description: "",
        thumbnail: null,
      });
    } catch (error) {
      console.error(`Error while updating the video ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">
          Update Video Thumbnail
        </h1>
        {isLoading ? (
          <Loader backgroundColor="white" />
        ) : (
          <form
            onSubmit={handleSubmitUpdateVideo}
            className="space-y-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={videoForm.title}
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
                value={videoForm.description}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:outline-none"
              />
            </div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700">
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
                required
                accept="image/*"
                className="hidden"
              />
              {videoForm.thumbnail && (
                <p className="text-gray-600">
                  {videoForm.thumbnail.name}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Update Video Thumbnail
              </button>
            </div>
            {isError && (
              <div className="text-red-500 text-center">
                {error?.message}
              </div>
            )}
            {isSuccess && (
              <div className="text-green-500 text-center">
                Video Update Successfully
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateVideoThumbnail;
