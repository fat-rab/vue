<template>
  <div>
    <div v-if="loadding">加载中。。。</div>
    <slot v-else :data="data" name="context"></slot>
  </div>
</template>

<script>
/**
 * <slot name="default"></slot>
 * 如果不写name 默认name="default"  template也可以不写v-slot,默认插入这个插槽
 * v-slot:context 可以用 #context 简写方式代替
 * slot标签上 :data="data" 父模板template标签上v-slot:context="{ data }" 可以让子模版的数据在父模板中使用,
 * <LSlot>
 *      <template v-slot:context="{ data }"
 *        >锣鼓喧天，旌旗蔽空地欢迎{{ data.name }}
 *      </template>
 * </LSlot>
 */
export default {
  props: ["url"],
  data() {
    return {
      loadding: true,
      data: {},
    };
  },
  created() {
    setTimeout(() => {
      this.loadding = false;
      this.data = { name: "LiLei" };
    }, 1000);
  },
};
</script>