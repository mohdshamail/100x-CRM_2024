import { handlePromise } from "../helper";

export const getprofileDataAPI = async (
  token,
) => {
  const urlWithParams = `/app-memberNumberGet?token=${token}`;

  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
