<template>
  <div>
     <!-- Renderless组件 -->
    <com-multiplexing
      v-slot:inputText="{ validate }"
      :rules="rules"
      :value="num"
    >
      <input type="text" @blur="validate" v-model="num" />
    </com-multiplexing>
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
          message: "请输入数字",
          test(value) {
            return /\d+/.test(value);
          },
        },
      ],
    };
  },
};
</script>