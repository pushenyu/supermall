<template>
  <div>
    <swiper>
      <template v-for="item in banners">
        <swiper-item :key="item.acm">
          <a :href="item.link">
            <img @load="imageLoad" :src="item.image" alt />
          </a>
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: Array,
    default() {
      return [];
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
</style>