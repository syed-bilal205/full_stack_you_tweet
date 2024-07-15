import { useRef } from "react";
import { useGetChannelStatsQuery } from "./dashboardApiSlice";
import { Loader } from "../../components";
import { Doughnut } from "react-chartjs-2";
import { FaHeart } from "react-icons/fa";
import { MdOutlineVideoLibrary, MdVisibility } from "react-icons/md";

const ChannelStats = () => {
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useGetChannelStatsQuery();

  const doughnutChartRef1 = useRef(null);
  const doughnutChartRef2 = useRef(null);

  if (isLoading) return <Loader backgroundColor={"white"} />;
  if (isError) return <div>Error: {error?.data?.message}</div>;

  const { videoCount, totalVideoViews, totalLikes, subscriberCount } =
    stats.message;

  const { videoLikes, commentLikes, tweetLikes } = totalLikes;

  //   console.log("videoCount:", videoCount);
  //   console.log("totalVideoViews:", totalVideoViews);
  //   console.log("videoLikes:", videoLikes);
  //   console.log("commentLikes:", commentLikes);
  //   console.log("tweetLikes:", tweetLikes);
  //   console.log("subscriberCount:", subscriberCount);

  const doughnutChartData = {
    labels: ["Likes", "Total Video Views", "Video Count"],
    datasets: [
      {
        data: [videoLikes, totalVideoViews, videoCount],
        backgroundColor: ["#F59E0B", "#4ADE80", "#2B6CB0"],
        hoverBackgroundColor: ["#FBBF24", "#34D399", "#2563EB"],
      },
    ],
  };

  const subscriberDoughnutData = {
    labels: ["Subscribers"],
    datasets: [
      {
        label: "Subscriber Count",
        data: [subscriberCount],
        backgroundColor: ["#F59E0B"],
        hoverBackgroundColor: ["#FBBF24"],
      },
    ],
  };

  //   console.log("doughnutChartData:", doughnutChartData);
  //   console.log("subscriberDoughnutData:", subscriberDoughnutData);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Channel Stats
      </h1>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MdOutlineVideoLibrary className="mr-2 text-blue-500" />
            Video Statistics
          </h2>
          <div className="flex justify-center">
            <Doughnut
              ref={doughnutChartRef1}
              data={doughnutChartData}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <MdVisibility className="mr-2 text-green-500" />
            Subscriber Count: {subscriberCount}
          </h2>
          <div className="flex justify-center">
            <Doughnut
              ref={doughnutChartRef2}
              data={subscriberDoughnutData}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Additional Information
          </h2>
          <div className="flex items-center space-x-4 mb-2">
            <FaHeart className="text-red-500 h-6 w-6" />
            <p className="text-gray-800 text-lg">
              Video Likes: {videoLikes}
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-2">
            <FaHeart className="text-red-500 h-6 w-6" />
            <p className="text-gray-800 text-lg">
              Comment Likes: {commentLikes}
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-2">
            <FaHeart className="text-red-500 h-6 w-6" />
            <p className="text-gray-800 text-lg">
              Tweet Likes: {tweetLikes}
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-2">
            <MdVisibility className="text-blue-500 h-6 w-6" />
            <p className="text-gray-800 text-lg">
              Total Video Views: {totalVideoViews}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <MdOutlineVideoLibrary className="text-green-500 h-6 w-6" />
            <p className="text-gray-800 text-lg">
              Video Count: {videoCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelStats;
