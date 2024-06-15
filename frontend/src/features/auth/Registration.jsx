import { useState } from "react";
import { useRegisterMutation } from "./authApiSlice";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUpload,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/index";

const Registration = () => {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [registrationResult, setRegistrationResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData).unwrap();
      setRegistrationResult(result);
      console.log(result);
      formData({
        username: "",
        fullName: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
      });
      navigate("/login");
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-black">
      {isLoading ? (
        <Loader backgroundColor={"black"} />
      ) : (
        <div className="w-full max-w-4xl p-8">
          <h1 className="text-5xl font-bold mb-6 text-center text-white">
            Register
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            <div className="flex flex-col ">
              <label className="block mb-2 text-white">
                <AiOutlineUser className="inline mr-2" />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex flex-col ">
              <label className="block mb-2 text-white">
                <AiOutlineUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              />
            </div>
            <div className="flex flex-col ">
              <label className="block mb-2 text-white">
                <AiOutlineMail className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none "
              />
            </div>
            <div className="flex flex-col ">
              <label className="block mb-2 text-white">
                <AiOutlineLock className="inline mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex flex-col ">
              <label className="block mb-2 text-white">
                <AiOutlineUpload className="inline mr-2" />
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              {formData.avatar && (
                <p className="text-gray-400 text-sm mt-1">
                  Selected file: {formData.avatar.name}
                </p>
              )}
            </div>
            <div className="flex flex-col ">
              <label className="block mb-2 text-white">
                <AiOutlineUpload className="inline mr-2" />
                Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {formData.coverImage && (
                <p className="text-gray-400 text-sm mt-1">
                  Selected file: {formData.coverImage.name}
                </p>
              )}
            </div>
            <p className="text-white">
              Have account?
              <Link to="/login" className="text-gray-400">
                {""} Login
              </Link>
            </p>
            <div className="sm:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full max-w-sm bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Register
              </button>
            </div>
            {isError && error.data && (
              <p className="text-red-500 text-center mt-4 sm:col-span-2">
                {error.data.message || "Registration failed"}
              </p>
            )}
            {isSuccess && registrationResult && (
              <p className="text-green-500 text-center mt-4 sm:col-span-2">
                Registration successful! Welcome,
                {registrationResult.data.username}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Registration;
