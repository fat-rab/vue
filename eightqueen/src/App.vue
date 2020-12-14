<!--
 * @Author: your name
 * @Date: 2020-12-09 17:25:42
 * @LastEditTime: 2020-12-12 10:50:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \eightqueen\src\App.vue
-->

<template>
  <div id="app">
    <!-- 自定义指令 -->
    <!-- <Size></Size> -->
    <!-- 插槽 -->
    <!-- <LSlot>
      <template v-slot:context="{ data }"
        >锣鼓喧天，旌旗蔽空地欢迎{{ data.name }}
      </template>
    </LSlot> -->
    <!-- 自定义组件使用v-modal -->
    <!-- <Lmodel v-model="selected" :list="list"></Lmodel>
    你选择了{{ selected.name }} -->
    <!-- <Lmodel
      :selected="selected"
      :list="list"
      @change="(data) => (this.selected = data)"
    ></Lmodel>
    -->
    <!-- Renderless组件 -->
    <!-- <SBody></SBody> -->
    <!-- <input type="text" v-model="input" placeholder="please input" /> -->
    <test></test>
  </div>
</template>
<script>
// import Lmodel from "./components/Lmodel";
//import LSlot from "./components/LSlot"
import test from "./components/test";
export default {
  name: "app",
  components: {
    // Lmodel,
    // LSlot
    test,
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
      list,
      selected: list[0],
    };
  },
  mounted() {
    //this.$notify("123");
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
