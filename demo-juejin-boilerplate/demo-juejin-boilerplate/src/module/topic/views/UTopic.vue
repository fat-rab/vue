<template>
  <div>
    <u-list :items="items"></u-list>
    <div class="bottom" v-intersect="{ handler: fetchNext }"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UList from "../components/UList.vue";
export default {
  name: "u-top",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    UList,
  },
  computed: {
    ...mapState({
      items: (state) => state.topic[state.topic.activeType].items,
    }),
  },
  created() {
    this.fetchNext();
  },
  methods: {
    fetchNext() {
      this.fetchData({ type: this.type });
    },
    ...mapActions({
      fetchData: "topic/FETCH_LIST_DATA",
    }),
  },
};
</script>
<style scoped>
.bottom {
  width: 100%;
  height: 40px;
  background: black;
}
</style>