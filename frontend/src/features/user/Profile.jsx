import { useGetUserQuery } from "./userApiSlice";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaImage,
  FaLock,
  FaUserCircle,
} from "react-icons/fa";

const Profile = () => {
  const { data, isLoading, isError, error } = useGetUserQuery();

  if (isLoading) {
    return <Loader backgroundColor={"white"} />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No user data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {data?.data ? (
        <div className="mb-4">
          <div className="relative">
            {data.data.coverImage && (
              <div
                className="h-64 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${data.data.coverImage})`,
                }}></div>
            )}
            {data.data.avatar && (
              <img
                src={data.data.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
              />
            )}
          </div>
          <div className="text-center mt-20">
            <h2 className="text-xl uppercase font-bold">
              <span className="text-gray-600 text-sm">
                Username:{" "}
              </span>
              {data.data.username}
            </h2>
            <p className="text-gray-600 ">
              <span className="text-gray-600 text-sm">Name: </span>
              {data.data.fullName}
            </p>
            <p className="text-gray-600">
              Joined:{" "}
              {data.data.createdAt
                ? new Date(data.data.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <div>No user data available</div>
      )}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">
          Update Your Profile
        </h3>
        <Link
          to="/update-account-details"
          className="flex items-center text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black py-2 px-4 rounded-lg mb-4 hover:bg-gradient-to-l transition duration-300">
          <FaUserEdit className="mr-2" /> Update Account Details
        </Link>
        <Link
          to="/update-avatar"
          className="flex items-center text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black py-2 px-4 rounded-lg mb-4 hover:bg-gradient-to-l transition duration-300">
          <FaUserCircle className="mr-2" /> Update Avatar
        </Link>
        <Link
          to="/update-cover-image"
          className="flex items-center text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black py-2 px-4 rounded-lg mb-4 hover:bg-gradient-to-l transition duration-300">
          <FaImage className="mr-2" /> Update Cover Image
        </Link>
        <Link
          to="/change-password"
          className="flex items-center text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black py-2 px-4 rounded-lg mb-4 hover:bg-gradient-to-l transition duration-300">
          <FaLock className="mr-2" /> Change Password
        </Link>
      </div>
    </div>
  );
};

export default Profile;
