import BaseHistory from "./base";
export default class HashHistory extends BaseHistory {
  constructor(options) {
    super(options)
    this.initListener()
  }
  initListener() {
    window.onhashchange = () => {
      this.transitionTo(this.getCurrentLocation())
    }
  }
  getCurrentLocation() {
    let path = decodeURI(window.location.hash) || "#/";
    let address = path.split('#')[1]
    //console.log(address, 'path')
    return address;
  }
  push(target) {
    this.transitionTo(target);
    window.location.hash = target
  }
}