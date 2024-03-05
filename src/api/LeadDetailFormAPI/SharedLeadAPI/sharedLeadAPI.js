import { handlePromise } from "../../helper";

export const sharedLeadAPI = async (leadID,select_member_id,mid) => {

  const urlWithParams = `/app-lswsheets/${leadID}?value=${select_member_id}&col=shared_member_id&mid=${mid}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};

