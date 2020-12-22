export default class BaseMode {
  constructor(router) {
    this.routerTable = router.routerTable
  }
  listen(cb) {
    this.cb = cb
  }
  transitionTo(route) {
    this.current = this.routerTable.math(route)
    this.cb(this.current)
  }
}
