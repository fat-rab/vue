<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  beforeRouteEnter(to, from, next) {
    console.log("home-beforeRouteEnter", to, from);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("home-beforeRouteUpdate", to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("home-beforeRouteLeave", to, from);
    next();
  },
};
</script>
