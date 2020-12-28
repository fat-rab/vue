import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import router from "./router";
import intersect from "./directive/intersect";
//import scrollDirective from "./directive/scroll";
import { init as themeInit } from "./config/theme";
import { init as permissionInit } from "./config/permission";
themeInit();
permissionInit();
Vue.directive("intersect", intersect);
//Vue.directive("scrollDirective", scrollDirective);
const app = new Vue({
  store,
  router,
  render: (h) => h(App),
});

app.$mount("#app");
