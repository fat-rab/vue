<template>
  <div>
    <div class="about">about me!!!</div>
    <input type="text" v-model="x" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: "",
    };
  },
};
</script>

<style scoped>
.about {
  padding: 30px;
  text-align: center;
}
</style>