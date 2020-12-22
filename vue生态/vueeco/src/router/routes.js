import Vue from "vue";
import Html5Mode from "./history/html5";
//import HashMode from "./history/hash"
import RouterView from "./components/RouterView.vue";
import RouterLink from "./components/RouterLink.vue";
Vue.component("RouterView", RouterView);
Vue.component("RouterLink", RouterLink);
function registerHook(list, fn) {
  list.push(fn);
  return () => {
    let i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
}
class RouterTable {
  constructor(routes) {
    this._pathMap = new Map();
    this.init(routes);
  }
  init(routes) {
    const addRoute = (route) => {
      //省略判断路由嵌套
      this._pathMap.set(route.path, route);
    };
    routes.forEach((route) => addRoute(route));
  }
  //匹配path
  math(path) {
    let find;
    //for of 用来遍历迭代器 map对象.keys()返回的是迭代器
    for (const key of this._pathMap.keys()) {
      if (key === path) {
        find = key;
        break;
      }
    }
    return this._pathMap.get(find);
  }
}
export default class Router {
  constructor({ routes = [] }) {
    this.routerTable = new RouterTable(routes);
    this.history = new Html5Mode(this);
    //this.hash = new HashMode(this)
    this.beforeHooks = [];
    this.resolveHooks = [];
    this.afterHooks = [];
  }
  init(app) {
    const { history } = this;
    history.listen((route) => {
      app._route = route;
    });
    history.transitionTo(history.getCurrentLocation());
    // const { hash } = this;
    // hash.listen((route) => {
    //   app._route = route;
    // });
    // hash.transitionTo(hash.getCurrentLocation());
  }
  push(to) {
    this.history.push(to);
    //this.hash.push(to);
  }
  beforeEach(fn) {
    return registerHook(this.beforeHooks, fn);
  }
  beforeResolve(fn) {
    return registerHook(this.resolveHooks, fn);
  }
  afterEach(fn) {
    return registerHook(this.afterHooks, fn);
  }
}
Router.install = () => {
  Vue.mixin({
    beforeCreate() {
      //this.$options.router是绑定在app根节点的组件上。所有只有根组件有这个router属性
      //所以所有的vue component的_routerRoot、_router、都是一样的。
      // this.$options.router存在吗？==》 是不是已经绑定_routerRoot的根节点
      if (this.$options.router !== undefined) {
        //this.$options main.js中Vue实例上的根
        //根节点的_routerRoot就是根节点的vue component
        this._routerRoot = this;
        // vue router实例
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
        //Vue.util.defineReactive(this, "_route", this._router.hash.current);
      } else {
        // 如果没有这个属性 ==》 两种情况 还没绑定这个属性的根节点、不是根节点
        // 未绑定属性的根节点组件，（根节点组件怎么会有爸爸呢）它不存在$parent属性、所以还是指向了自己
        // 不是根节点组件，那就找它爸爸的_routerRoot属性，用它爸爸的
        // vue的子组件beforeCreate肯定晚于父组件beforeCreate所以
        // 所有的组件就像一棵组件树以一样大家，从根向所有树枝树杈去传递这个属性
        // 大家都是用一个属性所以每个组件的_routerRoot都是根节点组件
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
    },
  });
};
