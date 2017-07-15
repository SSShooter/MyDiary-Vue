import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.interceptors.response.use(function (res) {
  console.log(res.data)
  if (res.data && res.data.code === 11) {
    alert('登录失效')
    router.push('/login')
    return
  }
  return res;
}, function (error) {
  // Do something with request error 
  return Promise.reject(error);
})
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})