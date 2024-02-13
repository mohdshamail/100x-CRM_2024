import { apiUrls } from "../../constants/apiUrls";
import { handlePromise } from "../helper";

export const ChangePasswordByTokenAPI = async (data, token) => {
  const reqBody = {
    token: token,
    newPWD: data.newPassword.value,
  };

  const apiPayload = {
    method: "POST",
    url: apiUrls.login,
    data: reqBody,
    headers:  { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
