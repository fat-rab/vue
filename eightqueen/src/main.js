import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
//自定义指令
Vue.directive("getResize", {
  inserted: function(el, binding) {
    //console.log(binding);
    let callback = binding.value;
    let arg = binding.arg;
    let modifiers = binding.modifiers;
    let result = () => {
      return arg === "1" ? window.innerWidth : window.innerHeight;
    };
    let onResize = () => {
      callback(result());
    };
    window.addEventListener("resize", () => {
      onResize();
    });
    if (modifiers && modifiers.quiet) {
      onResize();
    }
    el._onResize = onResize;
  },
  unbind: function(el) {
    if (!el._onResize) return;
    window.removeEventListener("resize", el._onResize);
    delete el._onResize;
  },
});
new Vue({
  render: (h) => h(App),
}).$mount("#app");
