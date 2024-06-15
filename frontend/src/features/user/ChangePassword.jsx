import { Loader } from "../../components";
import { useChangePasswordMutation } from "./userApiSlice";
import { useState } from "react";

const ChangePassword = () => {
  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();
  const [formPasswordChange, setFormPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPasswordChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const result = await changePassword(
        formPasswordChange
      ).unwrap();
      console.log(result);
    } catch (error) {
      console.log(`Error while changing password ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center p-2 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Change Password
      </h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block mb-1">Current Password</label>
            <input
              type="password"
              name="oldPassword"
              required
              value={formPasswordChange.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              required
              value={formPasswordChange.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
              Change Password
            </button>
          </div>
          {isError && (
            <div className="text-red-500 text-center">
              {error?.data?.message}
            </div>
          )}
          {isSuccess && (
            <div className="text-green-500 text-center">
              Password Changed
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
