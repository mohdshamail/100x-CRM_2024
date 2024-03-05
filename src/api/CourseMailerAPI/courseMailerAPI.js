import { handlePromise } from "../helper";

export const courseMailerAPI = async (leadID,mid) => {
  const urlWithParams = `/app_course_mailer`;
   console.log(leadID,mid)

const body = {
    lid:leadID,
    mid:mid,
}

  const apiPayload = {
    method: "POST",
    // url: urlWithParams,
    data:body,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
