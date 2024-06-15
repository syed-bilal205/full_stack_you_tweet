import { useUpdateUserAvatarMutation } from "./userApiSlice";
import { Loader } from "../../components";
import { useState } from "react";

const UpdateAvatar = () => {
  const [updateUserAvatar, { isLoading, isError, error }] =
    useUpdateUserAvatarMutation();

  const [avatar, setAvatar] = useState(null);
  console.log(avatar);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleUpdateAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) {
      console.error("Please select an avatar");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    try {
      const result = await updateUserAvatar(formData).unwrap();
      console.log(result);
    } catch (error) {
      console.error(`Error while updating avatar: ${error}`);
    }
  };

  return (
    <div>
      <h1>Update User Avatar</h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <form onSubmit={handleUpdateAvatarSubmit}>
          <div>
            <label>Avatar</label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
            />
            {avatar && <p>Selected file: {avatar.name}</p>}
          </div>
          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-sm bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
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
