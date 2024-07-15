import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  try {
    const serializedState = localStorage.getItem("subscriptions");
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (error) {
    console.error(
      "Error loading initial state from localStorage",
      error
    );
    return {};
  }
};

const initialState = {
  subscriptions: loadInitialState(),
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionStatus(state, action) {
      const { channelId, isSubscribed } = action.payload;
      state.subscriptions[channelId] = isSubscribed;
      try {
        const serializedState = JSON.stringify(state.subscriptions);
        localStorage.setItem("subscriptions", serializedState);
      } catch (error) {
        console.error("Error saving state to localStorage", error);
      }
    },
  },
});

export const { setSubscriptionStatus } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

export const selectSubscriptionStatus = (channelId) => (state) => {
  return state.subscription.subscriptions[channelId] ?? false;
};
