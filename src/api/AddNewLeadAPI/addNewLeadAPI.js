import { handlePromise } from "../helper";

export const addNewLeadAPI = async (
  add_name,
  add_email,
  course,
  country_code,
  add_mobile,
  mid,
) => {
  const urlWithParams = `/app-add-new-lead?add_name=${add_name}&add_email=${add_email}&course=${course}&country_code=${country_code}&add_mobile=${add_mobile}&mid=${mid}`;
  //console.log(urlWithParams);
  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
