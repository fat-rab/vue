import HistoryMode from "./mode/history";
import Vue from "vue";
import RouterView from "./components/RouterView.vue";
import RouterLink from "./components/RouterLink.vue";
Vue.component("RouterView", RouterView);
Vue.component("RouterLink", RouterLink);
class RouterTable {
  constructor(routes) {
    this.pathMap = new Map()
    this.init(routes)
  }
  init(routes) {
    const addRoute = (route) => {
      this.pathMap.set(route.path, route)
    }
    routes.forEach(route => addRoute(route))
  }
  math(path) {
    let find = this.pathMap.get(path)
    if (find) return find
  }
}

export default class Router {
  constructor({ routes = [] }) {
    this.routerTable = new RouterTable(routes)
    this.history = new HistoryMode(this)
  }
  init(app) {
    const { history } = this
    history.listen((route) => {
      app._route = route
    })
    history.transitionTo(history.getCurrentLocation())
  }
  push(to) {
    this.history.push(to)
  }
}

Router.install = () => {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router !== undefined) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this
      }
    },
  });
};
