<!--
 * @Author: your name
 * @Date: 2020-12-09 17:25:42
 * @LastEditTime: 2021-02-04 09:18:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \eightqueen\src\App.vue
-->

<template>
  <div id="app">
    <!-- 1自定义组件使用v-modal -->
    <!-- <Lmodel v-model="selected" :list="list"></Lmodel>
    你选择了{{ selected.name }} -->
    <!-- <Lmodel
      :selected="selected"
      :list="list"
      @change="(data) => (this.selected = data)"
    ></Lmodel> -->
    <!-- 2插槽 -->
    <!--<LSlot>
      <template v-slot:context="{ data }"
        >锣鼓喧天，旌旗蔽空地欢迎{{ data.name }}
      </template>
    </LSlot> -->
    <!-- 3自定义指令 -->
    <!-- <Size></Size> -->
    <!-- 4Renderless组件 -->
    <SBody></SBody>
    <!-- <test></test> -->
  </div>
</template>
<script>
//import Lmodel from "./components/Lmodel";
//import LSlot from "./components/LSlot";
//import test from "./components/test";
//import Size from "./components/Size";
import SBody from "./components/SBody";
export default {
  name: "app",
  components: {
    SBody,
    //Size,
    //Lmodel,
    //LSlot,
    //test,
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
