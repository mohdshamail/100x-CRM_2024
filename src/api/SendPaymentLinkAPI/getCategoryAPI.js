import { handlePromise } from "../helper";

export const getProductCategoryAPI = async (id) => {

  const urlWithParams = `/app-categories-products?category_id=${id}`;

    const apiPayload = {
    method: "GET",
    url: urlWithParams,
    //data: urlWithParams,
    headers: { "Content-Type": "application/json" },
  };

  return handlePromise(apiPayload);
};