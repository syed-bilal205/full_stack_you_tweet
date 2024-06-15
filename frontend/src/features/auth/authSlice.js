import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const refresh = cookies.get("refreshToken", { path: "/" });
console.log(refresh);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: cookies.get("accessToken", { path: "/" }) || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      cookies.remove("accessToken", { path: "/" });
      cookies.remove("refreshToken", { path: "/" });
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.accessToken;
