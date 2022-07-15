import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const tokenKey = "hkhome_token";
import { getLocal, setLocal } from "@/utils/storage";
export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    // user: null,
    user: getLocal(tokenKey),
    hotCityNow: [],
    all: [],
    detail: {},
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    setUser(state, user) {
      state.user = user;
      // localStorage.setItem(tokenKey, JSON.stringify(user));
      setLocal(tokenKey, user);
    },
    getHotCity(state, city) {
      state.hotCityNow = city;
    },
    getAll(state, all) {
      state.all = all;
    },
    getDetail(state, obj) {
      state.detail = obj;
    },
  },
  actions: {},
  modules: {},
});
