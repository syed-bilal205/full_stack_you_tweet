/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useToggleSubscriptionMutation } from "./subscriptionApiSlice";
import {
  selectSubscriptionStatus,
  setSubscriptionStatus,
} from "./subscriptionSlice";
import { FaCheck, FaPlus } from "react-icons/fa";

const ToggleButton = ({ channelId }) => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector(
    selectSubscriptionStatus(channelId)
  );
  const [toggleSubscription, { isLoading, isError, error }] =
    useToggleSubscriptionMutation();

  const handleToggleSubscription = async () => {
    try {
      const result = await toggleSubscription({ channelId });
      const { data } = result;
      dispatch(
        setSubscriptionStatus({
          channelId,
          isSubscribed: data.data ?? false,
        })
      );
    } catch (error) {
      console.error(`error while subscribing ${error}`);
    }
  };
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error?.data?.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleToggleSubscription}
        disabled={isLoading}
        className={`w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {isSubscribed ? (
              <>
                <FaCheck className="inline-block mr-2" />
                Subscribed
              </>
            ) : (
              <>
                <FaPlus className="inline-block mr-2" />
                Subscribe
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
};
export default ToggleButton;
