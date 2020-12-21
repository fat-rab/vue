import Vue from "vue";
import Html5Mode from "./history/html5";
//import HashMode from "./history/hash"
import RouterView from "./components/RouterView.vue";
import RouterLink from "./components/RouterLink.vue";
Vue.component("RouterView", RouterView);
Vue.component("RouterLink", RouterLink);
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
function registerHook(list, fn) {
  list.push(fn)
  return () => {
    let i = list.indexOf(fn)
    if (i > -1) list.splice(i, 1)
  }
}
export default class Router {
  constructor({ routes = [] }) {
    this.routerTable = new RouterTable(routes);
    this.history = new Html5Mode(this);
    //this.hash = new HashMode(this)
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
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
    registerHook(this.beforeHooks, fn)
  }
  beforeResolve(fn) {
    registerHook(this.resolveHooks, fn)
  }
  afterEach(fn) {
    registerHook(this.afterHooks, fn)
  }
}
Router.install = () => {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router !== undefined) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
        //Vue.util.defineReactive(this, "_route", this._router.hash.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
};
