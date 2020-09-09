import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import LazyLoad from 'vue-lazyload'
import './components/musicPlayerMain/musicPlayerContent/common/searchFrame'
import './assets/css/global.css'
import './assets/font/font_sznvk8nfzj/iconfont'
import './assets/css/font.css'
Vue.use(LazyLoad, {
  preLoad: 1.3,
  error: require('./assets/img/default.jpg'),
  loading: require('./assets/img/loading3.png'),
  attempt: 1
})
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
