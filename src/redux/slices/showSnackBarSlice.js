import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSnackBar: false,
};

export const showSnackBarSlice = createSlice({
  name: "showSnackBarSlice",
  initialState,
  reducers: {
    showSnackBar: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showSnackBar = action.payload;
    },
    hideSnackBar: (state) => {
      state.showSnackBar = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSnackBar, hideSnackBar } = showSnackBarSlice.actions;

export default showSnackBarSlice.reducer;
