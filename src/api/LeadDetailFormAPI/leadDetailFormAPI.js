import {apiUrls} from "../../constants/apiUrls";
import { handlePromise } from "../helper";

export const leadDetailFormAPI = async (id) => {

  const urlWithParams = `/app_get_lead_contact_details?id=${id}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
