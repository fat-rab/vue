<template>
  <div>
    <a style="cursor: pointer" @click="jump">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    jump() {
      const router = this._routerRoot._router;
      router.push(this.to);
    },
  },
};
</script>