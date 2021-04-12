<template>
  <div class="goods">
    <template v-for="item in goods">
      <goods-lis-iitem :goodsItem="item" />
    </template>
  </div>
</template>

<script>
import GoodsLisIitem from "./GoodsLisIitem.vue";
export default {
  components: { GoodsLisIitem },
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>>