import { apiUrls } from "../../constants/apiUrls";
import { handlePromise } from "../helper";

export const forgotPasswordAPI = async (data) => {
  // const reqBody = {
  //   email: data.email.value,
  // };
  const urlWithParams = `${apiUrls.forgotPassword}?email=${data.email.value}`;
  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    // url: apiUrls.forgotPassword,
    // data: reqBody,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
