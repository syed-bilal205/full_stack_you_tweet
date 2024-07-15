import { useUpdateUserAccountDetailsMutation } from "./userApiSlice";
import { Loader } from "../../components";
import { useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";

const UpdateAccountDetails = () => {
  const [updateAccountDetails, setUpdateAccountDetails] = useState({
    username: "",
    fullName: "",
    email: "",
  });
  const [
    updateUserAccountDetails,
    { isLoading, isSuccess, isError, error },
  ] = useUpdateUserAccountDetailsMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUserAccountDetails(
        updateAccountDetails
      ).unwrap();
      console.log(result);
    } catch (error) {
      console.error(`Error while updating account details: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center p-2 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Update User Account Details
      </h1>
      {isLoading ? (
        <Loader backgroundColor={"white"} />
      ) : (
        <form
          onSubmit={handleUpdateDetailsSubmit}
          className="space-y-4">
          <div>
            <label className=" mb-1 flex items-center">
              <AiOutlineUser className="mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={updateAccountDetails.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className=" mb-1 flex items-center">
              <AiOutlineUser className="mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={updateAccountDetails.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className=" mb-1 flex items-center">
              <AiOutlineMail className="mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={updateAccountDetails.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
              Update Details
            </button>
          </div>
          {isError && (
            <div className="text-red-500 text-center">
              {error?.data?.message}
            </div>
          )}
          {isSuccess && (
            <div className="text-green-500 text-center">
              Details updated
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UpdateAccountDetails;
