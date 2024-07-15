import { useState } from "react";
import { useCreatePlayListMutation } from "./playlistApiSlice";
import { Loader } from "../../components";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createPlayList, { isError, error, isLoading }] =
    useCreatePlayListMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlayList({
        name,
        description,
      });
      setName("");
      setDescription("");
      navigate("/user-playlist");
    } catch (err) {
      console.error("Failed to create the playlist", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Playlist
        </h1>
        {isLoading ? (
          <Loader backgroundColor={"white"} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Playlist Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Create Playlist
              </button>
            </div>
            {isError && (
              <div className="mt-2 text-red-600 flex items-center">
                <MdErrorOutline className="h-5 w-5 mr-1" />
                {error?.data?.message || "Failed to create playlist"}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePlaylist;
