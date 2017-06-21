import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
