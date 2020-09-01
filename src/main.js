import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import LazyLoad from 'vue-lazyload'
import './assets/css/global.css'
import './assets/font/font_sznvk8nfzj/iconfont'
import './assets/css/font.css'
Vue.use(LazyLoad, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.png',
  attempt: 1
})
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
router.afterEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
