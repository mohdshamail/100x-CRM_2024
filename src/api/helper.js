import Axios from "./axios";

export const handlePromise = (payload) => {
  return new Promise((resolve, reject) => {
    Axios(payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
