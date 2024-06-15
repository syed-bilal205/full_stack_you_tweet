import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Profile,
  Login,
  Registration,
  // AuthProtector,
  ChangePassword,
  UpdateAccountDetails,
  UpdateAvatar,
  UpdateCoverImage,
} from "./features/index.js";
import AuthProtector from "./utility/AuthProtector.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/profile",
        element: (
          <AuthProtector>
            <Profile />
          </AuthProtector>
        ),
      },
      {
        path: "/change-password",
        element: (
          <AuthProtector>
            <ChangePassword />
          </AuthProtector>
        ),
      },
      {
        path: "/update-account-details",
        element: (
          <AuthProtector>
            <UpdateAccountDetails />
          </AuthProtector>
        ),
      },
      {
        path: "/update-avatar",
        element: (
          <AuthProtector>
            <UpdateAvatar />
          </AuthProtector>
        ),
      },
      {
        path: "/update-cover-image",
        element: (
          <AuthProtector>
            <UpdateCoverImage />
          </AuthProtector>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={router} />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
