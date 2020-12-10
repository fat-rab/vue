<!--
 * @Author: your name
 * @Date: 2020-12-09 17:25:42
 * @LastEditTime: 2020-12-10 11:15:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \eightqueen\src\App.vue
-->

<template>
  <div id="app">
    <!-- <LSlot>
      <template v-slot:context="{ data }"
        >锣鼓喧天，旌旗蔽空地欢迎{{ data.name }}
      </template>
    </LSlot> -->
    <Lmodel v-model="selected" :list="list"></Lmodel>
    你选择了{{ selected.name }}
  </div>
</template>
<script>
import Lmodel from "./components/Lmodel";
export default {
  name: "app",
  components: {
    Lmodel,
  },
  data() {
    let list = [
      {
        name: "汤姆",
        value: "tom",
      },
      {
        name: "杰瑞",
        value: "jerry",
      },
    ];
    return {
      data: {
        num: 1,
      },
      list,
      selected: list[0],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
