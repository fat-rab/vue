<!--
 * @Author: your name
 * @Date: 2020-12-10 11:14:37
 * @LastEditTime: 2020-12-10 11:17:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \eightqueen\src\components\Size.vue
-->

<template>
  <div v-getResize:[direction].quiet="onResize">浏览器高度{{ height }}</div>
</template>
<script>
/**
 * 自定义指令创建方式
 * Vue.directive("demo", {
 * 只调用一次，指令第一次绑定到元素时调用
 * 可以进行一次性的初始化设置
 * bind:function(el,binding,vnode){
 * el.parentNode=null
 * },
 * 被绑定的元素插入父结点时调用
 * （仅保证父节点存在，但是不一定被插入文档中）
 * inserted:function(el,binding,vnode){
 * el.parentNode可以访问当前节点的父节点
 * }
 * 所在组件的vnode更新时调用，但是可能发生在其字Vnode更新之前
 * 指令的值可能发生了改变，也可能没有，但是可以通过比较更新前后的值来忽略不必要的更新，从而一定程度提高性能
 * update:function(el,binding,vnode,oldVnode){}
 * 指令所在组件的vnode以及其子vnode全部更新之后调用
 * componentUpdate:function(el,binding,vnode,oldVnode){}
 * 只调用一次，指令与元素解绑时调用
 * unbind:function(el,binding,vnode){}
 * });
 */
/**
 * 钩子函数参数
 * el 指令所绑定的元素，可以用来直接操作DOM
 * binding:{
 * name 指令名，不包含v-前缀
 * value 指令的绑定值，例如v-my-directive="1+1",绑定值为2
 * oldvalue 指令绑定的前一个之，仅在update 和componentUpdate中可以使用
 * expression 字符串形式的指令表达式 v-my-directive="1+1" 表达式为"1+1"
 * arg 传给指令的参数，可选 ， v-my-directive:foo   参数为foo
 * modifiers 一个包含修饰符的对象   v-my-directive.foo.bar   {foo:true ,bar :true}
 * }
 * vnode vue编辑生成的虚拟节点
 * oldNnode 上一个虚拟节点，仅在update 和componentUpdate中可以使用
 */
export default {
  data() {
    return {
      direction: "1",
      height: 0,
    };
  },
  methods: {
    onResize(height) {
      this.height = height;
    },
  },
};
</script>
