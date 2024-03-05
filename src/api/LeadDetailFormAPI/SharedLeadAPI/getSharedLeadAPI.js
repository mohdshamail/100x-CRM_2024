import { handlePromise } from "../../helper";

export const getSharedLeadAPI = async () => {

  const urlWithParams = `/share_lead_modl_show`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};

