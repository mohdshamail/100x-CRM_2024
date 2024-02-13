import { handlePromise } from "../helper";

export const sendEduvanzFormAPI = async (email,id) => {

  const urlWithParams = `/app-send-eduvanz-login-form?email=${email}&lswsheet_id=${id}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
