<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        @click.native="checkClick"
        :is-check="isSelectAll"
        class="check-button"
      />
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calculateClick">
      去计算:{{ checkedLength }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "./CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CarBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.newPrice * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calculateClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品')
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  flex: 1;
  margin-left: 20px;
}
.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: pink;
}
</style>