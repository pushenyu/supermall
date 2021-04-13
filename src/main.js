import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
// 使用懒加载的插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 安装toast插件
Vue.use(toast)
// 添加事件总线对象
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
