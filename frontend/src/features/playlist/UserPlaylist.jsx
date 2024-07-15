import { useState } from "react";
import {
  useGetUserPlaylistsQuery,
  useDeletePlaylistMutation,
  useRemoveVideoFromPlaylistMutation,
} from "./playlistApiSlice";
import { Loader } from "../../components";
import { MdErrorOutline } from "react-icons/md";
import { FaRegSadCry } from "react-icons/fa";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { AddVideo } from "../index";

const UserPlaylist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [deletePlaylist, { isLoading: isDeleting }] =
    useDeletePlaylistMutation();

  const {
    data: playlists,
    isError,
    error,
    isLoading: isFetching,
    refetch,
  } = useGetUserPlaylistsQuery();

  const [removeVideoFromPlaylist, { isLoading: removeLoading }] =
    useRemoveVideoFromPlaylistMutation();

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setPlayingVideo(null);
  };

  const handleVideoPlay = (videoId) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

  const handleVideoFromList = async (playlistId, videoId) => {
    await removeVideoFromPlaylist({
      playlistId,
      videoId,
    });
    refetch();
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await deletePlaylist({ playlistId });
      setSelectedPlaylist(null);
      refetch();
    } catch (err) {
      console.error("Failed to delete playlist", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-3">
      <div className="max-w-6xl w-full py-4 px-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold py-2 text-center text-gray-800">
          Your Playlists
        </h1>
        {isFetching ? (
          <div className="flex justify-center">
            <Loader backgroundColor={"white"} />
          </div>
        ) : isError ? (
          <div className="mt-4 text-red-600 flex items-center justify-center">
            <MdErrorOutline className="h-5 w-5 mr-1" />
            {error?.data?.message || "Failed to fetch playlists"}
          </div>
        ) : playlists?.data?.length === 0 ? (
          <div className="flex flex-col items-center mt-4">
            <FaRegSadCry className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-600">No playlists found.</p>
          </div>
        ) : (
          <div>
            <div className="hidden">
              <AddVideo refetchPlaylists={refetch} />
            </div>
            <ul className="space-y-4 mt-4">
              {playlists.data.map((playlist) => (
                <li
                  key={playlist._id}
                  className="p-4 border border-gray-300 rounded-md shadow-sm relative cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  onClick={() => handlePlaylistClick(playlist._id)}>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {playlist.name}
                    </h2>
                    <p className="text-gray-600">
                      {playlist.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created at:{" "}
                      {new Date(playlist.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Link
                      to={`/update-playlist/${playlist._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                      Update
                    </Link>
                    <button
                      className={`bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md ${
                        isDeleting
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlaylist(playlist._id);
                      }}
                      disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {selectedPlaylist && (
              <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Videos in{" "}
                  {playlists.data.find(
                    (p) => p._id === selectedPlaylist
                  )?.name || " Selected Playlist"}
                </h2>
                {playlists.data.find(
                  (p) => p._id === selectedPlaylist
                )?.videos.length === 0 ? (
                  <p className="text-gray-600">
                    No videos found in this playlist.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {playlists.data
                      .find((p) => p._id === selectedPlaylist)
                      ?.videos.map((video) => (
                        <div
                          key={video._id}
                          className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-all duration-200">
                          <div className="mb-2">
                            <p className="text-xl font-semibold text-gray-800">
                              {video.title}
                            </p>
                          </div>
                          <ReactPlayer
                            url={video.videoFile}
                            className="react-player"
                            width="100%"
                            playing={video._id === playingVideo}
                            controls={true}
                            light={
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="rounded-lg"
                              />
                            }
                            onPause={() => setPlayingVideo(null)}
                            onEnded={() => setPlayingVideo(null)}
                            onClick={() => handleVideoPlay(video._id)}
                          />
                          <div className="mt-2 flex justify-end">
                            <button
                              disabled={removeLoading}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                              onClick={() =>
                                handleVideoFromList(
                                  selectedPlaylist,
                                  video._id
                                )
                              }>
                              {removeLoading
                                ? "Removing..."
                                : "Remove"}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlaylist;
