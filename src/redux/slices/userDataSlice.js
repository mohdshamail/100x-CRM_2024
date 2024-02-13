import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: false,
};

export const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userData = action.payload;
    },
    removeUserData: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userData = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, removeUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
