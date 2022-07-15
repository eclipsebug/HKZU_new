import axios from "@/utils/request";

export const getUser = (a) => {
  return axios({
    method: "GET",
    url: "/user",

    headers: {
      authorization: `${a}`,
    },
  });
};

export const getFavorites = (a) => {
  return axios({
    method: "GET",
    url: "/user/favorites",

    headers: {
      authorization: `${a}`,
    },
  });
};

// 房屋管理
export const getRent = (a) => {
  return axios({
    method: "GET",
    url: "/user/houses",

    headers: {
      authorization: `${a}`,
    },
  });
};
// 房屋收藏 取消和收藏
export const getFavorite = (id, token) => {
  return axios({
    method: "GET",
    url: `/user/favorites/${id}`,
    headers: {
      authorization: `${token}`,
    },
  });
};
export const addFavorite = (id, token) => {
  return axios({
    method: "POST",
    url: `/user/favorites/${id}`,
    headers: {
      authorization: `${token}`,
    },
  });
};
export const delFavorite = (id, token) => {
  return axios({
    method: "DELETE",
    url: `/user/favorites/${id}`,
    headers: {
      authorization: `${token}`,
    },
  });
};

// 发布房源
export const postHouses = (data) => {
  return axios({
    method: "POST",
    url: "/user/houses",
    data,
  });
};
