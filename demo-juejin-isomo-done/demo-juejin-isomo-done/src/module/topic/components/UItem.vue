<template>
  <a
    class="item"
    :href="article.originalUrl"
    :style="{ borderColor: theme.primary }"
  >
    <div class="title">{{ article.title }}</div>
    <div class="tags" v-if="hasTag">
      #
      <span class="tag" v-for="tag in node.item_info.tags" :key="tag.id">{{
        tag.tag_name
      }}</span>
    </div>
  </a>
</template>

<script>
export default {
  name: "u-item",
  inject: ["theme"],
  props: {
    node: {
      required: true,
    },
  },
  computed: {
    article() {
      return this.node.item_info.article_info;
    },
    hasTag() {
      return this.node.item_info.tags && this.node.item_info.tags.length > 0;
    },
  },
};
</script>

<style scoped>
.item {
  display: block;
  background: #fff;
  color: #333;
  padding: 20px 0px 20px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.title {
  font-size: 16px;
  margin-bottom: 5px;
}
.tags {
  font-size: 12px;
  color: #999;
}
.tag {
  margin-right: 3px;
}
</style>
