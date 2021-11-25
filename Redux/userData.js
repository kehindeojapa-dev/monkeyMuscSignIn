import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const dataLayer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = dataLayer.actions;

// Selectors - pulling data from dataLayer
export const selectUsername = (state) => state.user.username;

export default dataLayer.reducer;
