import axios from "axios";
import { doLogout } from "../utility/utility";
import { store } from "../redux/store";
import { hideLoader, showLoader } from "../redux/slices/showLoaderSlice";
import { showError } from "../redux/slices/showErrorSlice";

const Axios = axios.create({
  baseURL: "https://crm.henryharvin.com/portal-new",
 // baseURL: "http://192.168.11.18:3000",
  timeout: 30000,
});

export default Axios;

const { dispatch } = store;

Axios.interceptors.request.use((config) => {
  dispatch(showLoader());
  return config;
});
const UNAUTHORIZED = 401;
Axios.interceptors.response.use(
  // success handler
  (response) => {
    dispatch(hideLoader());
    return response.data;
  },
  async (error) => {
    dispatch(hideLoader());
    const { status } = error.response || {};
    if (status == 500 || status == 503) {
      dispatch(showError(status));
      doLogout();
    }
    if (status === UNAUTHORIZED) {
      //DoLogout
    
    }
    // Propagate the error to the calling code
    return Promise.reject(error);
  }
);
