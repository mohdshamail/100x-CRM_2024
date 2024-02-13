import { handlePromise } from "../helper";

export const submitleadDetailFormAPI = async (
  lid,
  name,
  language,
  followUpDate,
  course,
  lead_quality,
  painArea,
  add_description,
  lead_revival_commnt
) => {
  console.log(lid);
  // Constructing the query parameters with proper formatting
  const urlWithParams = `/app-update-lswsheet-details?lid=${lid}&name=${name}&language=${language}&followUpDate=${followUpDate}&course=${course}&lead_quality=${lead_quality}&painArea=${painArea}&add_description=${add_description}&lead_revival_commnt=${lead_revival_commnt}`;

  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};
