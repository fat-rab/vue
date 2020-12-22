import Vue from "vue";
//import Router from 'vue-router'
import Router from "./routes";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log("/home.beforeEnter", to, from);
      next();
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    beforeEnter: (to, from, next) => {
      console.log("/about.beforeEnter", to, from);
      next();
    },
  },
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  console.log("route.beforeEach", to, from);
  next();
  //next(false)
});
router.beforeResolve((to, from, next) => {
  console.log("route.beforeResolve", to, from);
  next();
});
router.afterEach((to, from) => {
  console.log("route.afterEach", to, from);
});
export default router;
