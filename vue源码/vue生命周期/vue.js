(function (global, factory) {
  //判断环境
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.Vue = factory()));
})(this, function () {
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      console.log(options);
    };
  }
  //判断是否是new Vue
  function Vue(options) {
    if (!(this instanceof Vue)) {
      console.error(
        "Vue is a constructor and should be called with the `new` keyword"
      );
    }
    //options 为实例化时传入的对象
    this._init(options);
  }
  initMixin(Vue);
  return Vue;
});
