import Vue from "vue";

const methods = {
  $notify: function(template) {
    alert(template);
  },
};
function install() {
  Vue.mixin({ methods });
}
export default { install };
