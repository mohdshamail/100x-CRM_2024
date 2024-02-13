import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoader: false,
};

export const showLoaderSlice = createSlice({
  name: "showLoader",
  initialState,
  reducers: {
    showLoader: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showLoader = true;
    },
    hideLoader: (state) => {
      state.showLoader = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = showLoaderSlice.actions;

export default showLoaderSlice.reducer;
