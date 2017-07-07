<template>
  <div class="login">
    <img class="logo" src="../assets/logo.png">
    <input v-model="username" placeholder="请输入用户名">
    <input v-model="password" type="password" placeholder="请输入密码">
    <button @click="login">登陆</button>
  </div>
</template>
<script>
import api from '../api/api-config'
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      var data = {
        name: this.username,
        password: this.password
      }
      this.$axios.post(api.login, data)
        .then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$router.replace('home')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}
</script>

<style lang="less" scoped>
@import '../less/common.less';
.login {
  background-image: url('../assets/63524818_p0.png');
  background-size:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo,
  input,
  button {
    width: 250px;
  }
  input,
  button {
    height: 40px;
    font-size: 20px;
    margin-top: 10px;
  }
  .logo {
    width: 250px;
  }
  input {
    box-sizing: border-box;
    padding: 0 15px;
    border: none;
    background-color: #fff;
    border-radius: 5px;
  }
  button {
    border: none;
    background-color: #4582ff;
    color: #fff;
    border-radius: 50px;
  }
}
</style>
