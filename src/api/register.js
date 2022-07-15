import axios from "@/utils/request";
export const register = (data) => {
  return axios({
    method: "POST",
    url: "/user/registered",
    data,
  });
};
