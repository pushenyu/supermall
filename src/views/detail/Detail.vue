<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick" class="detail-nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info @imageLoad="imageLoad" :detailInfo="detailInfo" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick" />
    <detail-bottom-bar @addCart="addToCart" />
    <!-- <toast :message="message" :show="isShow" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import Scroll from "components/common/scroll/Scroll";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommends,
} from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
import { mapActions } from "vuex";
// import Toast from "../../components/common/toast/Toast.vue";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: -1,
      // message: "哈哈哈",
      // isShow: false,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    // Toast,
  },
  methods: {
    // ...mapActions(["addCart"]),
    ...mapActions({
      add: "addCart",
    }),
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = true;
      // 2.将商品添加到购物车
      this.add(product).then((res) => {
        this.$toast.show(res);
        // this.isShow = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = "";
        // }, 1500);
        // console.log(res);
      });
      // this.addCart(product).then((res) => {
      //   console.log(res);
      // });
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      // 3.添加到购物车成功
    },
    imageLoad() {
      this.newRefresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行比较
      // [0, 23196, 23838, 24107];
      // positionY在0和23196之间, (index = 0);
      // positionY在23196和和23838之间, (index = 1);
      // positionY在23838和24107之间, (index = 2);
      // positionY在24107和非常大的值之间, (index = 3);
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        // if (
        //   (this.currentIndex !== i &&
        //     i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //   (i === length - 1 && positionY >= this.themeTopYs[i])
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
      this.isShowBackTop = -position.y > 1000 ? true : false;
      this.listenShowBackTop(position);
    },
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.取出评论的信息
      if (data.rate.cRate.length !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 1.第一次获取,值不对
      // 值不对的原因: this.$refs.params.$el压根没有渲染;
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themeTopYs);
      // this.$nextTick(() => {
      //   // 2.第二次获取:值不对
      //   // 值不对的原因: 图片没有计算在内;
      //   // 根据最新的数据, 对应的dom是已经被渲染出来;
      //   // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片);
      //   // offsetTop值不对的时候, 都是因为图片的问题;
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // });
    });
    // 3.请求推荐数据
    getRecommends().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
    // 4.给getThemeTopYs赋值(对给this.getThemeTopYs赋值的操作进行防抖)
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  updated() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>