import { apiUrls } from "../../constants/apiUrls";
import { handlePromise } from "../helper";

export const lpwAPI = async () => {
//   const body = {
//     email: loginData.email.value,
//     password: loginData.password.value,
//   };
  const apiPayload = {
    method: "GET",
    url: apiUrls.lpw,
    // data: body,
    headers: { "Content-Type": "application/json" },
  };

  // Use a helper function to handle the promise and make the API request
  return handlePromise(apiPayload);
};
