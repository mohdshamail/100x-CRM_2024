import { apiUrls } from "../../constants/apiUrls";
import { handlePromise } from "../helper";

export const validateOtpAPI = async (formData, actual_otp, email) => {
 
  // const reqBody = {
  //   otp: formData.otp.value,
  // };
  const  input_otp = formData.otp.value;
  console.log( " otp api data appears here =" , input_otp , actual_otp , email);
  const urlWithParams = `${apiUrls.validateOtpApi}?Actual_otp=${actual_otp}&Input_otp=${input_otp}&email=${email}`;
  const apiPayload = {
    method: "GET",
    //url: apiUrls.validateOtpApi,
    url: urlWithParams,
    //data: reqBody,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
