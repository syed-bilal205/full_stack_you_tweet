import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const initialState = {
  accessToken: cookies.get("accessToken") || null,
  refreshToken: cookies.get("refreshToken") || null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      cookies.set("accessToken", accessToken, {
        path: "/",
        sameSite: "Strict",
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        sameSite: "Strict",
      });
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;
