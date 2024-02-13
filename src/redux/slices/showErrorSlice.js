import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showError: false,
};

export const showErrorSlice = createSlice({
  name: "showError",
  initialState,
  reducers: {
    showError: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showError = action.payload;
    },
    hideError: (state) => {
      state.showError = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showError, hideError } = showErrorSlice.actions;

export default showErrorSlice.reducer;
