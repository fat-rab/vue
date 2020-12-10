<template>
  <div>
    <!-- <div>TEXT{{ text }}</div>
    <input type="text" v-model="text" />
    <input type="text" v-model.lazy="text" />
    <input type="text" :value="text" @input="text = $event.target.value" /> -->
    <div @click="showBottom = !showBottom">{{ selected.name }}</div>
    <div v-if="showBottom">
      <div v-for="(item, i) in list" :key="i" @click="changeSelect(i)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
/**
 * v-model 是语法糖
 * select 使用value属性作为props 和change事件从子到父传递
 * textarea 和input 使用value 和input，如果想监听change事件的话可以使用v-model.lazy修饰符
 * checkbox 和radio 使用checked和change
 */
export default {
  model: {
    prop: "selected",
    event: "change",
  },
  props: ["selected", "list"],
  data() {
    return {
      text: "",
      showBottom: false,
    };
  },
  methods: {
    changeSelect(i) {
      this.$emit("change", this.list[i]);
      this.showBottom = false;
    },
  },
};
</script>