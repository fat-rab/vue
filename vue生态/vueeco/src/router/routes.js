import Vue from "vue";
import Html5History from "./history/html5";
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

export default class Router {
  constructor({ routes = [] }) {
    this.routerTable = new RouterTable(routes);
    this.history = new Html5History(this);
  }
  init(app) {
    const { history } = this;
    history.listen((route) => {
      app._route = route;
    });
    history.transitionTo(history.getCurrentLocation());
  }
  push(to) {
    this.history.push(to);
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
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
};
