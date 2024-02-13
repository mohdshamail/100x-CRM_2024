import { handlePromise } from "../helper";

export const sendlmsAPI = async (id) => {

  const urlWithParams = `/app_send_preview_lms?id=${id}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
