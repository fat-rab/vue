import BaseMode from "./base";

export default class HistoryMode extends BaseMode {
  constructor(options) {
    super(options);
    this.initListener()
  }
  initListener() {
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }
  getCurrentLocation() {
    let path = window.location.pathname
    return path + window.location.search + window.location.hash
  }
  push(target) {
    this.transitionTo(target)
    window.history.pushState({ key: +new Date() }, "", target)
  }
}
