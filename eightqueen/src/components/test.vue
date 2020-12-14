<template>
  <div>
    <ComMultiplexing :rules="rules" :value="num">
      <template v-slot:inputText="{ validate }">
        <input type="text" v-model="num" @blur="validate" />
      </template>
    </ComMultiplexing>
  </div>
</template>

<script>
import ComMultiplexing from "./ComMultiplexing";
export default {
  components: {
    ComMultiplexing,
  },
  data() {
    return {
      num: 1,
      rules: [
        {
          message: "请输入至少一个数字",
          test(value) {
            return /\d+/.test(value);
          },
        },
      ],
    };
  },
  mounted() {
    //this.$notify(`123`);
  },
  methods: {},
};
</script>