import { handlePromise } from "../helper";

export const submitFilterFormAPI = async (
  mid,
  email,
  valall,
  filter_lead_quality,
  filter_blank,
  camp_filter,
  esdate,
  eedate,
  allocation_s_date,
  allocation_e_date,
  certificate_status,
  sortby,
  //country
  lmsdate,
  lmedate,
  followupFrom,
  followupTo,
  filter_course,
  filter_lCity,
  filter_pain,
  fliter_product,
  filter_lead1,
  filter_lead2,
  callCount,
  filter_pbd,
  campaignFrom,
  campaignTo,
  productleadQ,
  sharedLeadFilter,     
  ) => {
  //const urlWithParams = `/app-lpw-index?mid=${mid}&email=${email}&valall=${searchQuery}&leadQ=${fliter_lQuality}&blank=${filter_blank}&camp_filter=${camp_filter}&esdate=${esdate}&eedate=${eedate}&allocation_s_date=${allocation_s_date}&allocation_e_date=${allocation_e_date}&certificate_status=${certificate_status}&lmsdate=${lmsdate}&lmedate=${lmedate}&followupFrom=${followupFrom}&followupTo=${followupTo}&course=${fliter_course}&callCount=${callCount}&pbd=${filter_pbd}&campaignFrom=${campaignFrom}&campaignTo=${campaignTo}&productleadQ=${product_lead_quality}&lcity=${filter_lCity}&pain=${filter_pain}&fliter_product=${fliter_product}&sortby=${sortby}&lead1=${filter_lead1}&lead2=${filter_lead2}&sharedLeadsFilter=${sharedLeadsFilter}`;
  const urlWithParams = `/app-lpw-index?mid=${mid}&email=${email}&valall=${valall}&filter_lead_quality=${filter_lead_quality}&filter_blank=${filter_blank}&camp_filter=${camp_filter}&esdate=${esdate}&eedate=${eedate}&allocation_s_date=${allocation_s_date}&allocation_e_date=${allocation_e_date}&certificate_status=${certificate_status}&sortby=${sortby}&lmsdate=${lmsdate}&lmedate=${lmedate}&followupFrom=${followupFrom}&followupTo=${followupTo}&filter_course=${filter_course}&filter_lCity=${filter_lCity}&filter_pain=${filter_pain}&fliter_product=${fliter_product}&filter_lead1=${filter_lead1}&filter_lead2=${filter_lead2}&callCount=${callCount}&filter_pbd=${filter_pbd}&campaignFrom=${campaignFrom}&campaignTo=${campaignTo}&productleadQ=${productleadQ}&sharedLeadFilter=${sharedLeadFilter}`;
  console.log(urlWithParams);
  const apiPayload = {
    method: "GET",
    url: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };
  // Use a helper function to handle the promise and make the API request
  return handlePromise(apiPayload);
};
