<template>
  <div>
    <header>
      <div class="left-btn">
        <i class="iconfont icon-prev" @click="$router.go(-1)"></i>
      </div>
      <span class="title">设定</span>
      <div class="right-btn">
        <i class="iconfont icon-baocun" @click="saveInfo"></i>
      </div>
    </header>
    <div class="items">
      <div class="devide">
        <span>你的情报</span>
      </div>
      <div class="item">
        <span class="title">用户名</span>
        <input class="value" v-model="username" disabled></input>
      </div>
      <div class="item">
        <span class="title">昵称</span>
        <input class="value" v-model="nickname"></input>
      </div>
      <div class="item">
        <span class="title">性别</span>
        <input class="value" v-model="gender"></input>
      </div>
      <div class="item">
        <span class="title">手机号码</span>
        <input class="value" v-model="mobile"></input>
      </div>
      <div class="item">
        <span class="title">电子邮件</span>
        <input class="value" v-model="email"></input>
      </div>
      <div class="devide">
        <span>关于MyDiary</span>
      </div>
      <div class="item">
        <span class="title">
          <i class="iconfont icon-shuoming"></i>说明</span>
      </div>
      <div class="item">
        <span class="title">
          <i class="iconfont icon-github-copy"></i>由来</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/api-config.js'
import { mapGetters } from 'vuex'
import DeleteModal from '../components/DeleteModal.vue'

export default {
  data() {
    return {
      username: '',
      nickname: '',
      email: '',
      mobile: '',
      gender: ''
    }
  },
  components: {
    DeleteModal
  },
  activated() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$axios.get(api.getinfo)
        .then(res => {
          if (res.data.code === 11) {
            alert('登录失效')
            this.$router.push('/login')
          }
          var data = res.data.data
          if (res.data.code === 0) {
            this.username = data.username
            this.nickname = data.nickname
            this.email = data.email
            this.mobile = data.mobile
            this.gender = data.gender
          }
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    saveInfo() {
      this.$axios.post(api.saveinfo, this.$data)
        .then(res => {
          if (res.data.code === 0) {
          }
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/common.less';
header {
  .commonheader(@bgcolor: @main-color, @fontcolor: #fff);
}

.items {
  .devide {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    background-color: #f5f5f5;
  }
  .item {
    box-sizing: border-box;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: #ccc 1px dashed;
    .iconfont {
      font-size: 25px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .value {
      float: right;
      text-align: right;
      height: 45px;
      border: none;
    }
  }
}

input:disabled {
  background-color: #fff;
}
</style>