<template>
  <swiper class="detail-swiper">
    <template v-for="item in topImages">
      <swiper-item :key="item">
        <img :src="item" />
      </swiper-item>
    </template>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>