<script>
export default {
  name: "RouterView",
  render() {
    const route = this._routerRoot._route;
    if (!route) return;
    const hook = {
      init(vnode) {
        route.instance = vnode.componentInstance;
      },
    };
    const { component } = route;
    return <component hook={hook} />;
  },
};
</script>