import Vue from "vue";
import Router from "./routes";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new Router({
  routes,
});

export default router;
