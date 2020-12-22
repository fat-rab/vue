<script>
export default {
  name: "RouterView",
  data() {
    return {
      test:'123'
    }
  },
  render() {
    const route = this._routerRoot._route;
    if (!route) return;
    const { component } = route;
    return <component></component>;
  },
};
</script>