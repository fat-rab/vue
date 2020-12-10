<template>
  <div>
    
  </div>
</template>

<script>
/**
 * 组件通信
 * 1组件跨层级访问
 * 1.1 可以通过$root对根组件(最外层组件)获取、写入数据，访问计算属性，调用方法，可以通过$parent对父组件进行相同操作，会造成强耦合
 * 可以在各个生命周期钩子中使用
 * 1.2父访问子，可以通过ref，只能在mounte生命周期被调用之后使用
 * 2依赖注入
 * 声明了当前组件以来的父组件们（直系祖宗）的外部prop有哪些
 * 父组件：provide(){
 * return{
 *   fish:{love:'tama'}
 * }
 * }
 * 子组件：inject:["fish"]    console.log(this.fish.love)
 * 3组件二次封装
 */
export default {
  data() {
    return {
      
    }
  },
}
</script>