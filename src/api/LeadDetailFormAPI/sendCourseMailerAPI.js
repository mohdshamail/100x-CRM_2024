import { handlePromise } from "../helper";

export const sendCourseMailerAPI = async (id) => {

  const urlWithParams = `/app-course-mailer-get?id=${id}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
