export default class BaseMode {
  constructor(router) {
    this.routerTable = router.routerTable;
  }
  listen(cb) {
    this.cb = cb;
  }
  transitionTo(path) {
    let route = this.routerTable.math(path);
    this.current = route;
    this.cb(this.current);
  }
}
