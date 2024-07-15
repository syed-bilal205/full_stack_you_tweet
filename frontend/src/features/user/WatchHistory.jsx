import { useGetWatchHistoryQuery } from "./userApiSlice";
import { Loader } from "../../components";

const WatchHistory = () => {
  const { data, isLoading, isError, error } =
    useGetWatchHistoryQuery();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Watch History</h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : isError ? (
        <p className="text-red-600">Error: {error.data.message}</p>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                Owned by: {item.owner.username} ({item.owner.email})
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default WatchHistory;
