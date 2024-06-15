/* eslint-disable react/no-unescaped-entities */
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const [loginFormData, setLoginFormData] = useState({
    identifier: "",
    password: "",
  });
  const [login, { isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(loginFormData).unwrap();
      console.log(result.data.loggedInUser);
      dispatch(
        setCredentials({
          accessToken: result.data.accessToken,
        })
      );
      setLoginFormData({ identifier: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {isLoading ? (
        <Loader backgroundColor={"black"} />
      ) : (
        <div className="w-full max-w-md p-8">
          <h1 className="text-5xl font-bold mb-6 text-center text-white">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-white">
                <AiOutlineUser className="inline mr-2" />
                Username or Email
              </label>
              <input
                type="text"
                name="identifier"
                onChange={handleChange}
                value={loginFormData.identifier}
                required
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-white">
                <AiOutlineLock className="inline mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={loginFormData.password}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <p className="text-white">
              don't have an account?
              <Link to="/register" className="text-gray-400">
                {" "}
                Register
              </Link>
            </p>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300">
                Login
              </button>
            </div>
            {isError && error.data && (
              <p className="text-red-500 text-center mt-4">
                {error.data.message || "Login failed"}
              </p>
            )}
            {isSuccess && (
              <p className="text-green-500 text-center mt-4">
                Login successful! Welcome,
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
