<template>
  <div
    class="x-infinite"
    ref="container"
    :style="{ padding: padding }"
  >
    <slot :sliceItems="sliceItems"></slot>
  </div>
</template>

<script>
import { throttle } from "../util/throttle";

export default {
  props: {
    items: {
      required: true,
    },
    //每一个item的高度
    itemHeight: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      buffer: 5, //优化用户体验
      scrollTop: 0, //document.body.scrollTop 网页被卷去的高
      viewportHeight: 0, //window.innerHeight返回窗口的文档显示区的高度
    };
  },
  computed: {
    //已经滚动过的节点
    //为了优化体验，不能把一不渲染的组件就删除掉，需要有一个缓冲的过程(buffer),并且要从0开始取列表中的值
    over() {
      return Math.max(this.scrollTop / this.itemHeight - this.buffer, 0);
    },
    //当前滚动(this.viewportHeight)加上视口将要滚动到的节点(this.scrollTop)
    //因为要优化用户体验，所以要将显示的节点提前渲染(this.scrollTop)，并且要多渲染几个(buffer)，所以向上取整(Math.ceil)
    //并且要和items.height比较大小
    down() {
      return Math.min(
        Math.ceil(
          this.scrollTop + this.viewportHeight / this.itemHeight + this.buffer
        ),
        this.items.length
      );
    },
    sliceItems() {
      return this.items.slice(this.over, this.down);
    },
    padding() {
      return `${this.over * this.itemHeight}px 0 ${Math.max(
        (this.items.length - this.down) * this.itemHeight,
        0
      )}px 0`;
    },
  },
  created() {
    this.scrollTop = document.documentElement.scrollTop;
    this.viewportHeight = window.innerHeight;
    //passive: true  scroll事件的默认行为(页面滚动)是可以被监听器通过preventDefault()组织的，所以他需要等监听器
    //执行完毕，才能执行默认行为，如果监听函数执行时间很长的话，就会出现卡顿，设置passive:true就可以使得默认行为和监听函数
    //同时执行
    document.addEventListener("scroll", this.onScroll, {
      passive: true,
    });
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll: throttle(function () {
      this.scrollTop = document.documentElement.scrollTop;
      this.viewportHeight = window.innerHeight;
    }),
  },
};
</script>