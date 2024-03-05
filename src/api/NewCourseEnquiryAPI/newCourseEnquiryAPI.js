import { handlePromise } from "../helper";

export const newCourseEnquiryAPI = async (
  course_title,
  description,
  mid,
  email
) => {
  const urlWithParams = `/app_new_course_enquiry?course_title=${course_title}&description=${description}&mid=${mid}&email=${email}`;

  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
