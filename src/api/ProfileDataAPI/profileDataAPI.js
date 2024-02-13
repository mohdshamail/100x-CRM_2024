import { handlePromise } from "../helper";

export const profileDataAPI = async (
  token,
  wcc,
  did,
  cc,
  v_name,
  ozonetel_campaign_name,
  whatsapp,
) => {
  const urlWithParams = `/app-memberNumberUpdate?token=${token}&wcc=${wcc}&did=${did}&cc=${cc}&v_name=${v_name}&ozonetel_campaign_name=${ozonetel_campaign_name}&whatsapp=${whatsapp}`;

  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
