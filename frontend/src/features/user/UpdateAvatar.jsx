import { useUpdateUserAvatarMutation } from "./userApiSlice";
import { Loader } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";

const UpdateAvatar = () => {
  const [updateUserAvatar, { isLoading, isError, error }] =
    useUpdateUserAvatarMutation();

  const [formData, setFormData] = useState({
    avatar: null,
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

  const handleUpdateAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!formData.avatar) {
      console.error("Please select an avatar");
      return;
    }
    try {
      await updateUserAvatar(formData).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error(
        `Error while updating avatar: ${error?.data?.message}`
      );
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center p-2 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Update User Avatar
      </h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <form
          onSubmit={handleUpdateAvatarSubmit}
          className="space-y-4">
          <div>
            <label className=" mb-1 flex items-center">
              <AiOutlineFileImage className="mr-2" />
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              required
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {formData.avatar && (
              <p className="mt-2">
                Selected file: {formData.avatar.name}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
              Update Avatar
            </button>
          </div>
          {isError && (
            <div className="text-red-500 text-center">
              {error?.data?.message || "An error occurred"}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UpdateAvatar;
