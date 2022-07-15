import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vant from "@/plugins/vant";
import "@/styles/reset.css";
import TiTle from "@/components/Title.vue";
import "amfe-flexible";
import store from "./store";

Vue.component("TiTle", TiTle);
Vue.config.productionTip = false;

Vue.use(vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
