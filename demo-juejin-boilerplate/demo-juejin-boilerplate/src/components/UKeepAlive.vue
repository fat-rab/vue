<script>
import {
  isDef,
  remove,
  getComponentName,
  getFirstComponentChild,
} from "../util/vue";
function pruneCacheEntry(cache, key, keys, node) {
  const cached = cache[key];
  if (cached && (!node || cached.tag !== node.tag)) {
    cached.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}
export default {
  name: "u-keep-alive",
  props: {
    max: [Number, String],
  },
  created() {
    //创建缓存结构
    this.cache = Object.create(null);
    this.keys = []; //组件都会映射成一个KEY,存在keys里面，通过key索引到cache 里面
  },
  render() {
    const slot = this.$slots.default; //获取当前u-keep-alive中组件的信息
    const vnode = getFirstComponentChild(slot); //获取第一个子组件的vnode
    const componentOptions = vnode && vnode.componentOptions; //获取vnode组件的信息
    //console.log(vnode, componentOptions);
    if (componentOptions) {
      const { cache, keys } = this;
      const key =
        vnode.key == null
          ? `${componentOptions.Ctor.cid}::${componentOptions.tag || ""}`
          : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove(key, keys);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      vnode.data.keepAlive = true;
    }
    return vnode;
  },
};
</script>