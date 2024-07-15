/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  useAddVideoMutation,
  useGetUserPlaylistsQuery,
} from "./playlistApiSlice";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const AddVideo = ({ videoId, refetchPlaylists }) => {
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetUserPlaylistsQuery();
  const playlistsList = playlists?.data;

  const [
    addVideoMutation,
    { isLoading: isAddingVideo, isError, error, isSuccess },
  ] = useAddVideoMutation();

  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddVideo = async (playlistId) => {
    try {
      await addVideoMutation({
        playlistId,
        videoId,
      }).unwrap();

      setShowSuccessMessage(true);
      if (refetchPlaylists) {
        refetchPlaylists();
      }
    } catch (error) {
      console.error("Error adding video to playlist:", error);
    }
  };

  const closePopup = () => {
    setShowPlaylistPopup(false);
    setShowSuccessMessage(false);
  };

  return (
    <div className="relative">
      <AiOutlinePlus
        size={24}
        className="cursor-pointer text-gray-600 hover:text-gray-800 transition duration-300"
        onClick={() => setShowPlaylistPopup(true)}
      />
      {showPlaylistPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-6 bg-white rounded-lg shadow-lg relative w-96">
            <div className="flex justify-end mb-4">
              <AiOutlineClose
                size={24}
                className="cursor-pointer text-gray-600 hover:text-gray-800 transition duration-300"
                onClick={closePopup}
              />
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add to Playlist:
              </h2>
            </div>
            {isLoadingPlaylists ? (
              <p className="text-gray-600">Loading playlists...</p>
            ) : playlistsList?.length === 0 ? (
              <p className="text-gray-600">No playlists found.</p>
            ) : (
              <ul className="space-y-2">
                {playlistsList.map((playlist) => (
                  <li
                    key={playlist._id}
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition duration-300"
                    onClick={() => handleAddVideo(playlist._id)}>
                    <span className="text-gray-700">
                      {playlist.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {isAddingVideo && (
              <p className="text-blue-600 mt-4">
                Adding video to playlist...
              </p>
            )}
            {isError && (
              <p className="text-red-600 mt-4">
                {error?.data?.message || "Failed to add video"}
              </p>
            )}
            {isSuccess && showSuccessMessage && (
              <p className="text-green-600 mt-4">
                Video successfully added to playlist!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVideo;
