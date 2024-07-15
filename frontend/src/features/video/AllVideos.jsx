import { useGetVideosQuery } from "./videoApiSlice";
import { Loader } from "../../components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSort,
  FaUser,
  FaClock,
  FaEye,
  FaArrowLeft,
  FaArrowRight,
  FaPlus,
  FaVideo,
  FaList,
} from "react-icons/fa";

const AllVideos = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [query, setQuery] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isFabOpen, setIsFabOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetVideosQuery({
    page,
    limit,
    sortBy,
    sortType,
    query,
  });

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
    setPlayingVideo(null);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPlayingVideo(null);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
    setPlayingVideo(null);
  };

  const handleVideoPlay = (videoId) => {
    setPlayingVideo(videoId);
  };

  if (isLoading) return <Loader backgroundColor={"white"} />;
  if (isError) return <div>Error: {error.message}</div>;

  const videos = data?.data?.videos || [];
  const totalPages = data?.data?.totalPages || 1;

  const filteredVideos = videos.filter((video) => video.isPublished);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Videos
      </h1>
      <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-full"
          />
          <FaSearch className="absolute top-3 right-4 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-8 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-none">
            <option value="createdAt">Sort by Created At</option>
            <option value="title">Sort by Title</option>
            <option value="owner">Sort by Owner</option>
          </select>
          <FaSort className="absolute top-3 right-4 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={sortType}
            onChange={handleSortTypeChange}
            className="px-8 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-none">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <FaSort className="absolute top-3 right-4 text-gray-400" />
        </div>
        <div className="relative">
          <select
            value={limit}
            onChange={handleLimitChange}
            className="px-8 py-2 border border-gray-300 rounded-lg focus:outline-none appearance-none">
            <option value={5}>Show 5 per page</option>
            <option value={10}>Show 10 per page</option>
            <option value={20}>Show 20 per page</option>
          </select>
          <FaSort className="absolute top-3 right-4 text-gray-400" />
        </div>
      </div>
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-2">
              <Link to={`/video/${video._id}`}>
                <h2 className="text-xl font-bold mb-2 capitalize text-gray-700">
                  {video.title}
                </h2>
              </Link>
              <div className="relative overflow-hidden cursor-pointer">
                <ReactPlayer
                  url={video.videoFile}
                  className="react-player"
                  width="100%"
                  height="240px"
                  playing={video._id === playingVideo}
                  controls={true}
                  light={
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-lg mb-2"
                    />
                  }
                  onPause={() => setPlayingVideo(null)}
                  onEnded={() => setPlayingVideo(null)}
                  onClick={() => handleVideoPlay(video._id)}
                />
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <FaClock className="mr-1" />
                <p className="text-sm">Duration: {video.duration}s</p>
                <FaEye className="ml-4 mr-1" />
                <p className="text-sm">Views: {video.views}</p>
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <Link
                  to={`/user/c/${video.owner.username}`}
                  className="flex items-center">
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.username}
                    className="w-10 h-10 rounded-full object-cover mr-2"
                  />
                  <FaUser className="mr-1" />
                  <p className="text-sm">{video.owner.username}</p>
                </Link>
                <p className="flex items-center text-sm ml-auto">
                  <FaClock className="mr-1" />
                  Created At:{" "}
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-600 mt-4">
          No videos available
        </p>
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black hover:bg-gray-600 text-white"
          }`}>
          <FaArrowLeft className="mr-2" /> Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg ml-2 ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black hover:bg-gray-600 text-white"
          }`}>
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setIsFabOpen(!isFabOpen)}
          className="bg-black hover:bg-gray-600 text-white p-4 rounded-full shadow-lg focus:outline-none">
          <FaPlus className="text-xl" />
        </button>
        {isFabOpen && (
          <div className="flex flex-col items-end space-y-2 mt-2">
            <Link
              to="/publish"
              className="flex items-center bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
              <FaVideo className="mr-2" /> Publish Video
            </Link>
            <Link
              to="/create-playlist"
              className="flex items-center bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
              <FaList className="mr-2" /> Create Playlist
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
              <FaList className="mr-2" /> DashBoard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVideos;
