;import { handlePromise } from "../helper";

export const checkShopseAPI = async ( name,email,mobile,amount ) => {

  const urlWithParams = `/app-check-eligibility?name=${name}&email=${email}&sendto=${mobile}&amount=${amount}`;
  // console.log(urlWithParams);

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
