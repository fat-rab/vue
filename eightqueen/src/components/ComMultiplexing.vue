<!--
 * @Author: your name
 * @Date: 2020-12-12 10:56:12
 * @LastEditTime: 2020-12-12 11:04:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \eightqueen\src\components\MixinCom.vue
-->
<template>
  <div>
    <!-- Renderless组件 -->
    <slot name="inputText" :validate="validate"></slot>
    {{ errMsg }}
  </div>
</template>

<script>
/**
 * Mixin 模式
 * Mixin是可以轻松被一个子类或者一组子类继承功能的类，目的施函数复用
 * Vue.mixin 全局注册的mixin，会影响到所有创建的vue实例
 * 单个文件中使用mixin:   mixins:[xxxx]
 * 如果mixin和组件出现同名的生命周期钩子函数，函数将会合并成一个数组，在组件自身钩子之前调用，随后调用组件自身钩子
 * 二者的methods components和directives 将被合并成同一个对象，如果键名重复，则调用组件
 * 插件
 * Vue.use(plugin)
 * 插件需要具备Install方法,install方法中使用mixin混入全局,在main.js中use
 */
/**
 * 组件复用
 * 1 Mixins
 * 缺点: 打破了原有组件的封装，增加了组件的复杂度，可能出现命名冲突，仅仅只是对逻辑的复用，模板不能复用
 * 2 HOC（higher order component） 高阶组件
 * HOC:函数接受一个组件作为参数，并返回一个新的组件，可复用的逻辑在函数中实现
 * 相比较mixins的优点：
 * 模板可以复用，不会出现命名冲突（本质上是一个HOC套了一个父组件）
 * 缺点： 多层嵌套，组件复杂度高，多层嵌套，调试很麻烦
 * 3 Renderless组件
 * 3-1 复用的逻辑沉淀在包含slot插槽的组件
 * 3-2 接口由插槽Prop来暴露
 * 优点：模板可以复用，不会出现命名冲突，符合依赖倒置原则，服用的接口来源清晰
 */
export default {
  props: ["rules", "value"],
  data() {
    return {
      errMsg: "",
    };
  },
  mounted() {
    //this.$notify(`123`);
  },
  methods: {
    validate() {
      let validate = this.rules.reduce((pre, cur) => {
        let check = cur && cur.test && cur.test(this.value);
        this.errMsg = check ? "" : cur.message;
        return pre && check;
      }, true);
      return validate;
    },
  },
};
</script>