import axios from "@/utils/request";

// 获取城市
export const getCity = (level) =>
  axios({
    url: "/area/city",
    params: { level },
  });
// 获取热门城市
export const getHotCity = () =>
  axios({
    url: "/area/hot",
  });
