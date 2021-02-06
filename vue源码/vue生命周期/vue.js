(function (global, factory) {
  //(this,function)
  //判断环境，global.Vue = factory()将Vue赋值给全局对象
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.Vue = factory()));
})(this, function () {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  // 方便复用Vue.options.components   Vue.component
  var ASSET_TYPES = ["component", "directive", "filter"];
  //全局配置对象
  var config = {
    optionMergeStrategies: Object.create(null),
  };
  //自定义策略
  var strats = config.optionMergeStrategies;
  //默认策略
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  };
  function mergeOptions(parent, child, vm) {
    /**
     * parent Vue自身的属性
     * child  实例化时传入的data等
     * vm  实例
     */
    //选项规范检测 Components Props Inject Directives
    var options = {};
    var key;
    for (const key in parent) {
      //一般会对watch，component等等进行自定义处理
      mergeField(key);
    }
    for (const key in child) {
      //如果需要扩展属性,但是parent和child出现相同的属性，则child中的属性不做处理
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    //选项策略梳理el data 生命周期钩子函数......
    //自定义策略(strats对象) 默认策略
    function mergeField(key) {
      var start = strats[key] || defaultStrat;
      options[key] = start(parent[key], child[key], vm, key);
    }
    return options;
  }
  function initMixin(Vue) {
    //在vue原型上扩展一个方法
    Vue.prototype._init = function (options) {
      console.log(options);
      //选项合并
      var vm = this;
      //涉及到组件，暂时按照简写成下面的代码
      // vm.$options = mergeOptions(
      //   resolveConstructorOptions(vm.constructor),
      //   options || {},
      //   vm
      // );
      vm.$options = mergeOptions(Vue.options, options || {}, vm);
    };
  }

  function Vue(options) {
    //判断是否是new Vue
    if (!(this instanceof Vue)) {
      console.error(
        "Vue is a constructor and should be called with the `new` keyword"
      );
    }
    //初始化vue，options 为实例化时传入的对象
    this._init(options);
  }
  Vue.options = Object.create(null); //Vue.options={}
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + "s"] = Object.create(null);
  });
  initMixin(Vue);
  return Vue;
});
