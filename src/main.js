import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
