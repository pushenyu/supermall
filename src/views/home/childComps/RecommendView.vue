<template>
  <div class="recommends">
    <template v-for="item in recommends">
      <div class="recommends-item" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt />
          <div>{{ item.title }}</div>
        </a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommends {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommends-item {
  flex: 1;
}
.recommends-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>