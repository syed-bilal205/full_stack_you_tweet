/* eslint-disable react/prop-types */
import { usePublishTweetMutation } from "./tweetApiSlice";
import { Loader } from "../../components";
import { useState } from "react";

const CreateTweet = ({ onClose }) => {
  const [createTweet, { isLoading, isError, error }] =
    usePublishTweetMutation();

  const [formData, setFormData] = useState({
    tweet: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTweet({
        text: formData.tweet,
      });
      onClose();
    } catch (error) {
      console.error(`Error while creating tweet: ${error}`);
    }
  };

  return (
    <div>
      <h1>Published Tweet</h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : isError ? (
        <p className="text-red-600">Error: {error?.data?.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              name="tweet"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
              Publish Tweet
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTweet;
