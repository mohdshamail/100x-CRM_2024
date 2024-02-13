import { apiUrls } from "../../constants/apiUrls";
import { handlePromise } from "../helper";

export const leadFilterFormAPI = async () => {

  const apiPayload = {
    method: "GET",
    url: apiUrls.lpw,
    headers: { "Content-Type": "application/json" },
  };

  // Use a helper function to handle the promise and make the API request
  return handlePromise(apiPayload);
};
