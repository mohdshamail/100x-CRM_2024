import { handlePromise } from "../helper";

export const leadDetailsAPI = async (memberID) => {

  const urlWithParams = `/app-lpw-index?mid=${memberID}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
