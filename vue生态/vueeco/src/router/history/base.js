//两种MODE相同的部分
export default class BaseHistory {
  constructor({ routerTable }) {
    this.routerTable = routerTable;
  }
  listen(cb) {
    this.cb = cb;
  }
  transitionTo(target) {
    const route = this.routerTable.math(target);
    this.current = route;
    this.cb(this.current);
  }
}
