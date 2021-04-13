<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template slot="center">购物车({{ length }})</template>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <car-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import CarBottomBar from "./childComps/CarBottomBar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    CartList,
    CarBottomBar,
  },
  computed: {
    // 两种语法
    // ...mapGetters(["cartLength"]),
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>