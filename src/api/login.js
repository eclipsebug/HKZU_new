import axios from "@/utils/request";
export const Login = (data) =>
  axios({
    method: "POST",
    url: "/user/login",
    data,
  });
