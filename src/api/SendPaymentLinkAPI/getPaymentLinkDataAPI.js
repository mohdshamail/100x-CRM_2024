// /app-auto/pl
import { handlePromise } from "../helper";

export const getPaymentLinkDataAPI = async () => {

  const urlWithParams = `/payment_courses`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
