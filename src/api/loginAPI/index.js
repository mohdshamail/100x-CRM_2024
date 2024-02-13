// Import necessary constants and utility functions
import { apiUrls } from "../../constants/apiUrls";
import { handlePromise } from "../helper";

// Define the loginAPI function for a REST API
export const loginAPI = async (loginData) => {
  // Construct the JSON body for the request
  // const body = {
  //   email: loginData.email.value,
  //   password: loginData.password.value,
  // };
  const urlWithParams = `${apiUrls.login}?email=${loginData.email.value}&password=${loginData.password.value}`;
  // Define the payload for the Axios request
    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  // Use a helper function to handle the promise and make the API request
  return handlePromise(apiPayload);
};
