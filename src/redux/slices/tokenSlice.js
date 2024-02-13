import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
