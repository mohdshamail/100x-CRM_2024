import { handlePromise } from "../helper";

export const requestForCouponAPI = async () => {

  const urlWithParams = `/app_coupon_request_model_show`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
