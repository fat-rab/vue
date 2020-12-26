<template>
  <div>
    <u-infinite-list #default="{ sliceItems }" :items="items" :item-height="80">
      <u-list :items="sliceItems"></u-list>
    </u-infinite-list>
    <div class="bottom" v-intersect="{ handler: fetchNext }"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UList from "../components/UList.vue";
import UInfiniteList from "../../../components/UInfiniteList.vue";
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
    UInfiniteList,
  },
  computed: {
    ...mapState({
      items: (state) => state.topic[state.topic.activeType].items,
    }),
  },
  watch: {
    type(type) {
      this.fetchNext();
    },
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