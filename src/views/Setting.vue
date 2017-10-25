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
        <span>用户信息</span>
      </div>
      <div class="avatar" @click="changeAvatar">
        <img :src="avatar">
      </div>
      <div class="item">
        <span class="title">用户名</span>
        <input class="value" v-model="username" disabled>
      </div>
      <div class="item">
        <span class="title">昵称</span>
        <input class="value" v-model="nickname">
      </div>
      <div class="item">
        <span class="title">性别</span>
        <input class="value" v-model="gender">
      </div>
      <div class="item">
        <span class="title">手机号码</span>
        <input class="value" v-model="mobile">
      </div>
      <div class="item">
        <span class="title">电子邮件</span>
        <input class="value" v-model="email">
      </div>
      <div class="devide">
        <span>关于MyDiary</span>
      </div>
      <div class="item">
        <span class="title">
          <i class="iconfont icon-shuoming" @click="toHelp"></i>帮助</span>
      </div>
      <div class="item">
        <span class="title">
          <i class="iconfont icon-github-copy"></i>由来</span>
      </div>
    </div>
    <upload-avatar ref="UploadAvatar"></upload-avatar>
  </div>
</template>

<script>
import api from '../api/api-config.js'
import DeleteModal from '~/DeleteModal'
import UploadAvatar from '~/setting/UploadAvatar'

export default {
  data () {
    return {
      username: '',
      nickname: '',
      email: '',
      mobile: '',
      gender: '',
      avatar: ''
    }
  },
  components: {
    DeleteModal,
    UploadAvatar
  },
  activated () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$axios.get(api.getinfo)
        .then(res => {
          var data = res.data.data
          if (res.data.code === 0) {
            this.username = data.username
            this.nickname = data.nickname
            this.email = data.email
            this.mobile = data.mobile
            this.gender = data.gender
            this.avatar = data.avatar || '/static/avatar63808612.jpg'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    saveInfo () {
      this.$axios.post(api.saveinfo, this.$data)
        .then(res => {
          if (res.data.code === 0) {
            alert('信息已更新！')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changeAvatar () {
      this.$refs.UploadAvatar.isModalShow = true
    },
    toHelp () {
      this.$router.push('/help')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/common.less';
@import '../../node_modules/vue-croppa/dist/vue-croppa.css';
header {
  .commonheader(@bgcolor: @main-color, @fontcolor: #fff);
}

.items {
  height: @todolist-container-height;
  overflow-y: scroll;
  font-size: 1rem;
  .avatar {
    border-radius: 50%;
    position: relative;
    left: 50%;
    height: 100px;
    width: 100px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: -50px;
    overflow: hidden;
    border-bottom: #ccc 1px dashed;
    img {
      width: 100%;
      overflow: hidden;
    }
  }
  .devide {
    font-size: .8em;
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
    &:nth-child(3) {
      border-top: #ccc 1px dashed;
    }
  }
}

input:disabled {
  background-color: #fff;
}
</style>