import { useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "./userApiSlice";
import { Loader } from "../../components";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { ToggleButton } from "../index";
import {
  useGetUserSubscribedChannelsQuery,
  useGetUserSubscribersQuery,
} from "../subscription/subscriptionApiSlice";

const UserProfile = () => {
  const { username } = useParams();
  const { data, isLoading, isError, error } =
    useGetUserProfileQuery(username);

  const userId = data?.data?._id;

  const { data: subscribers } = useGetUserSubscribersQuery(
    {
      channelId: userId,
    },
    { skip: !userId }
  );
  // console.log(subscribers?.data);
  const { data: channelSubscribed } =
    useGetUserSubscribedChannelsQuery(
      { subscriberId: userId },
      { skip: !userId }
    );
  if (isLoading) {
    return <Loader backgroundColor={"white"} />;
  }
  // console.log(channelSubscribed?.data);
  if (!data) {
    return (
      <div className="text-center text-gray-500">
        No user data available
      </div>
    );
  }

  const {
    _id,
    avatar,
    coverImage,
    username: user,
    fullName,
    createdAt,
  } = data.data;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error?.data?.message}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">
        User Profile
      </h1>
      <div className="mb-4">
        <div className="relative">
          {coverImage && (
            <div
              className="h-64 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${coverImage})` }}></div>
          )}
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
            />
          )}
        </div>
        <div className="text-center  mt-20">
          <h2 className="text-xl uppercase font-bold flex items-center justify-center space-x-2">
            <FaUser className="text-gray-600" />
            <span className="text-gray-600 text-sm">
              Username:
            </span>{" "}
            {user}
          </h2>
          <p className="text-gray-600 flex items-center justify-center space-x-2">
            <FaUser className="text-gray-600" />
            <span className="text-gray-600 text-sm">Name:</span>{" "}
            {fullName}
          </p>
          <p className="text-gray-600 flex items-center justify-center space-x-2">
            <FaCalendarAlt className="text-gray-600" />
            <span className="text-gray-600 text-sm">Joined:</span>
            {createdAt
              ? new Date(createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <div className="py-4">
            <ToggleButton channelId={_id} />
          </div>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-lg font-bold">
                {subscribers?.data?.count}
              </p>
              <p className="text-gray-600">Subscribers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">
                {channelSubscribed?.data?.count}
              </p>
              <p className="text-gray-600">Subscribed To</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
