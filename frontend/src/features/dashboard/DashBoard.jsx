import ChannelStats from "./ChannelStats";
import ChannelVideo from "./ChannelVideo";
import { MdDashboard } from "react-icons/md";

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MdDashboard className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-lg font-semibold">
              Channel Statistics
            </h2>
          </div>
          <ChannelStats />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MdDashboard className="text-blue-500 text-3xl mr-2" />
            <h2 className="text-lg font-semibold">Channel Videos</h2>
          </div>
          <ChannelVideo />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
