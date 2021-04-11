<template>
  <div id="app">
    <router-view />
    <main-tabbar />
  </div>
</template>
<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";
export default {
  components: {
    MainTabbar,
  },
  name: "App",
};
</script>
<style>
@import "assets/css/base.css";
</style>
