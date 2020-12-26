import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/store";
import { routes as topic } from "./module/topic/router";
import { PERMISSION_MAP, getPermissionByRole } from "./config/permission";
import { compose } from "./util/compose";
Vue.use(VueRouter);

const getRole = () => store.state.user.role;
const getPermission = (perimission) => {
  return compose((obj) => obj[perimission], getPermissionByRole, getRole)();
};
const router = new VueRouter({
  mode: "history",
  routes: [
    ...topic,
    {
      name: "about",
      path: "/about",
      component: () =>
        import(/* webpackChunkName:"about" */ "./views/UAbout.vue"),
      beforeEnter(to, from, next) {
        getPermission(PERMISSION_MAP.ABOUT_PAGE) ? next() : next("/403");
      },
    },
    {
      name: "403",
      path: "/403",
      component: () => import(/* webpackChunkName:"403" */ "./views/403.vue"),
    },
    {
      path: "/",
      redirect: "/hot",
    },
  ],
});

export default router;
