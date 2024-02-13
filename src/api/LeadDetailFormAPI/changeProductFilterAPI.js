import { handlePromise } from "../helper";

export const changeProductFilterAPI = async (id,value) => {

  const urlWithParams = `/app-change-product?id=${id}&value=${value}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
//https://crm.henryharvin.com/portal-new/lpw/changeprod?lid=8488589&value=1
