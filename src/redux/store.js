import { configureStore } from "@reduxjs/toolkit";
import showErrorSlice from "./slices/showErrorSlice";
import showLoaderSlice from "./slices/showLoaderSlice";
import showSnackBarSlice from "./slices/showSnackBarSlice";
import tokenSlice from "./slices/tokenSlice";
import userDataSlice from "./slices/userDataSlice";


export const store = configureStore({
  reducer: {
    showLoader: showLoaderSlice,
    token: tokenSlice,
    showSnackBar: showSnackBarSlice,
    userData: userDataSlice,
    showError: showErrorSlice,

  },
});
