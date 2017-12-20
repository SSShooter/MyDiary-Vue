import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/index'
import axios from 'axios'
import AlloyFinger from 'alloyfinger/alloy_finger.js'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})
axios.defaults.withCredentials = true
axios.interceptors.response.use(res => {
  console.log(res.data)
  if (res.data && res.data.code === 11) {
    alert('登录失效')
    router.push('/login')
    return
  }
  return res
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
