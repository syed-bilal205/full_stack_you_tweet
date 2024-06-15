import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import authReducer from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
