import { handlePromise } from "../helper";

export const sendPaymentLinkAPI = async( payment ) => {
  const paymentString = encodeURIComponent(JSON.stringify(payment));
  const urlWithParams = `/app-auto/pl?send_automated_payment_link=true&payment=${paymentString}`;
  // console.log("urlWithParams = " , urlWithParams);

// ⚠️  ✅️
  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};


//{"lead_id":${lead_id},"member_id":${member_id},"send_through_mail":${mailChecked},"send_through_sms":${smsChecked},
//"amount":${amount},"coupon_ids":[${coupon_ids}],"pending_amount":${pending_amount},"due_date":${due_date},
//"offer_amount":${offer_amount},"note":${note},"courses":${courses},"payment_option":${payment_option},
//"is_pending_payment":${is_pending_payment},"mobile":${mobile},"email":${email},"currencypa":${currencypa},
//"products":[],"addons":[],"fresh_pending":${fresh_pending},"is_sap_partner":${is_sap_partner},
//"reg_type":${reg_type},"country_selector":${country_selector},"offerDeadline":${offerDeadline}