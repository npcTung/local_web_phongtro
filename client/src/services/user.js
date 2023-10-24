import axios from "../axiosConfig";

export const apiGetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/v1/user/get-current",
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
  
export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "/api/v1/user/",
        data: payload,
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
