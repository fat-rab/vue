import Vue from "vue";
import VueRouter from "vue-router";
import { routes as topic } from "./module/topic/router";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        ...topic,
        {
            path: "/",
            redirect: "/hot",
        },
    ],
})

export default router