import { handlePromise } from "../helper";

export const changeCourseFilterAPI = async (id,value) => {

  const urlWithParams = `/app-change-course?id=${id}&value=${value}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
//https://crm.henryharvin.com/portal-new/lpw/changeCourse?lid=8488589&value=INTRODUCTION+TO+SONGWRITING
