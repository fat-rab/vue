<template>
  <div class="x-infinite" ref="container" :style="{padding: padding}">
    <slot :sliceItems="sliceItems"></slot>
  </div>
</template>

<script>
import { throttle } from "../util/throttle";

export default {
  props: {
    items: {
      required: true
    },
    itemHeight: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      buffer: 5,
      scrollTop: 0, //document.body.scrollTop 网页被卷去的高
      viewportHeight: 0 //window.innerHeight返回窗口的文档显示区的高度
    };
  },
  computed: {
    over() {
      return Math.max(
        Math.floor(this.scrollTop / this.itemHeight) - this.buffer,
        0
      );
    },
    down() {
      return Math.min(
        Math.ceil(
          (this.scrollTop + this.viewportHeight) / this.itemHeight + this.buffer
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
    }
  },
  created() {
    this.scrollTop = document.body.scrollTop;
    this.viewportHeight = window.innerHeight;

    document.addEventListener("scroll", this.onScroll, {
      passive: true
    });
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll: throttle(function() {
      this.scrollTop = document.body.scrollTop;
      this.viewportHeight = window.innerHeight;
    })
  }
};
</script>