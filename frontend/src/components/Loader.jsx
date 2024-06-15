/* eslint-disable react/prop-types */
import { CircleLoader } from "react-spinners";

const Loader = ({ backgroundColor }) => {
  const loaderColor = backgroundColor === "white" ? "black" : "white";
  return (
    <div className="flex justify-center items-center min-h-screen">
      <CircleLoader
        color={loaderColor}
        size={150}
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loader;
