import { useUpdateUserCoverImageMutation } from "./userApiSlice";
import { Loader } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsUpload } from "react-icons/bs";

const UpdateCoverImage = () => {
  const [updateCoverImage, { isLoading, isSuccess, isError, error }] =
    useUpdateUserCoverImageMutation();
  const [formData, setFormData] = useState({
    coverImage: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmitCoverImage = async (e) => {
    e.preventDefault();
    try {
      await updateCoverImage(formData).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error(
        `Error while updating cover image: ${error?.data?.message}`
      );
    }
  };

  return (
    <div className="max-w-screen-lg h-screen flex flex-col  justify-center mx-auto px-4 py-8">
      <h1 className="text-4xl py-4 font-bold mb-4">
        Update Cover Image
      </h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <form onSubmit={handleSubmitCoverImage} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="w-36 flex-shrink-0">
              <span className="text-gray-600">Cover Image</span>
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                required
                accept="image/*"
                className="hidden"
              />
            </label>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="coverImage"
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm text-gray-800 transition duration-300 ease-in-out">
                <BsUpload className="inline-block mr-2" />
                Upload
              </label>
              {formData.coverImage && (
                <p className="text-gray-600">
                  {formData.coverImage.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
              Update Cover Image
            </button>
          </div>
          {isError && (
            <div className="text-red-500 text-center">
              {error?.data?.message}
            </div>
          )}
          {isSuccess && (
            <div className="text-green-500 text-center">
              Cover image updated successfully
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UpdateCoverImage;
