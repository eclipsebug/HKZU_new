import request from "@/utils/request";

export const getHouses = (city) => {
  return request({
    method: "GET",
    url: "/houses",
    params: {
      cityId: city,
      stat: 20,
      end: 29,
    },
  });
};
// 房屋的具体信息
export const getHousesDetail = (id) => {
  return request({
    method: "GET",
    url: `/houses/${id}`,
    // url: `/houses/369157ee-b3b8-4c00`,
  });
};

export const housesCondition = (cityArea) => {
  return request({
    method: "GET",
    url: "/houses/condition",
    params: {
      id: cityArea,
    },
  });
};
