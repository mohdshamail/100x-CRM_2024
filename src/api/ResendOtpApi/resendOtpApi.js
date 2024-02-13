import { handlePromise } from "../helper";
import { apiUrls } from "../../constants/apiUrls";

export const resendOtpAPI = async (email,otp) => {
  const urlWithParams = `${apiUrls.resendOtpApi}?email=${email}&otp=${otp}`;

  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //url: apiUrls.resendOtpApi,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
