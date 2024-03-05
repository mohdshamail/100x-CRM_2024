import { handlePromise } from "../helper";

export const submitCouponRequestAPI = async (mid, email, type, discount_percentage, flat_discount, flat_discount_usd, filter_course, filter_product, total_price, number_of_coupons) => {
  
  // Construct URL with query parameters
  const urlWithParams = `/app_coupon_request_ticket?mid=${mid}&email=${email}&type=${type}&discount_percentage=${discount_percentage}&flat_discount=${flat_discount}&flat_discount_usd=${flat_discount_usd}&filter_course[]=${[JSON.stringify(filter_course)]}&filter_product[]=${[JSON.stringify(filter_product)]}&total_price=${total_price}&number_of_coupons=${number_of_coupons}`;
 console.log(urlWithParams);
  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    headers: { "Content-Type": "application/json" }, 
  };

  return handlePromise(apiPayload);
};
