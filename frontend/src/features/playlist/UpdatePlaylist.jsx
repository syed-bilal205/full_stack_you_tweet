import { useUpdatePlaylistMutation } from "./playlistApiSlice";
import { useState } from "react";
import { Loader } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const UpdatePlaylist = () => {
  const [updatePlaylist, { isError, isLoading, error }] =
    useUpdatePlaylistMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const playlistId = useParams().playlistId;
  const navigate = useNavigate();

  const handleUpdatePlaylist = async (e) => {
    e.preventDefault();
    try {
      await updatePlaylist({
        playlistId,
        data: { name, description },
      });
      setName("");
      setDescription("");
      navigate("/user-playlist");
    } catch (error) {
      console.error(`Error while updating playlist ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        <div className="flex items-center mb-4">
          <IoMdArrowBack
            className="text-gray-600 cursor-pointer mr-2"
            size={24}
            onClick={() => navigate("/user-playlist")}
          />
          <h1 className="text-2xl font-semibold">Update Playlist</h1>
        </div>
        {isLoading ? (
          <Loader backgroundColor={"white"} />
        ) : (
          <form onSubmit={handleUpdatePlaylist}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Update Playlist
              </button>
            </div>
            {isError && (
              <div className="mt-2 text-red-600 flex items-center">
                {error?.data?.message || "Failed to update playlist"}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePlaylist;
