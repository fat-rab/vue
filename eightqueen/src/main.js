import Vue from "vue";
import App from "./App.vue";
//import notify from "./plugin/notify";
Vue.config.productionTip = false;
import directive from "./util/directive/directive";
//console.log(directive, "directive");

for (const key in directive) {
  Vue.directive(key, directive[key]);
}
//自定义插件
//Vue.use(notify);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
