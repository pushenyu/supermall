<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <template v-for="(item, index) in cartList">
        <cart-list-item :key="index" :item-info="item" />
      </template>
    </scroll>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  components: { Scroll, CartListItem },
  name: "CartList",
  computed: {
    ...mapState(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>