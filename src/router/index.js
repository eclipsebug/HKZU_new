import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/Home"),
    children: [
      {
        path: "/home/list",
        component: () => import("@/views/List"),
      },
      {
        path: "/home/news",
        component: () => import("@/views/News"),
      },
      {
        path: "/home/profile",
        component: () => import("@/views/Profile"),
      },
    ],
  },
  {
    path: "/map",
    component: () => import("@/views/Map"),
  },
  {
    path: "/city",
    component: () => import("@/views/City"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/registe",
    component: () => import("@/views/Registe"),
  },
  {
    path: "/favorate",
    component: () => import("@/views/Favorate"),
  },
  {
    path: "/rent",
    component: () => import("@/views/Rent"),
    children: [
      {
        path: "/rent/add",
        component: () => import("@/views/Add"),
      },
    ],
  },
  {
    path: "/detail",
    component: () => import("@/views/Detail"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
