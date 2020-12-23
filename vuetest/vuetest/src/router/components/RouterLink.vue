<template>
  <div>
    <a style="cursor: pointer" @click="jump">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      test: "123",
    };
  },
  methods: {
    jump() {
      const router = this._routerRoot._router;
      router.push(this.to);
    },
  },
};
</script>