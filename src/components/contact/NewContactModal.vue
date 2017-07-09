<template>
  <transition name="fade">
    <div v-show="isModalShow">
      <div class="mask" @click="isModalShow=!isModalShow"></div>
      <div class="modal">
        <input v-model.trim="contact" placeholder="姓名">
        <input v-model="number" type="number" placeholder="联系方式">
        <input v-model="initial" placeholder="首字母">
        <button @click="newContact">确定</button>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../api/api-config.js'
const pinyin = require('pinyin');
export default {
  data() {
    return {
      isModalShow: false,
      contact: '',
      number: '',
      initial: ''
    }
  },
  watch: {
    isModalShow(val) {
      if (!val) {
        this.contact = '';
        this.number = '';
        this.initial = '';
      }
    },
    contact(val, oldval) {
      var reg = /^[A-Za-z]$/;
      if (oldval === '') {
        if (reg.test(val)) {
          this.initial = val;
        } else {
          this.initial = pinyin(val.split('')[0], {
            style: pinyin.STYLE_FIRST_LETTER
          })[0][0];
          if (!reg.test(this.initial)) this.initial = '#';
        }
      }
    }
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder'
  }),
  methods: {
    newContact() {
      if (this.contact && this.number && this.initial)
        this.$axios.post(api.newContact, {
          folderId: this.currentFolder,
          contact: this.contact,
          initial: this.initial,
          number: this.number,
          createdate: +new Date()
        })
          .then(res => {
            if (res.data.code === 11) {
              alert('登录失效')
              this.$router.push('/login')
            }
            if (res.data.code === 0) {
              this.isModalShow = false
              this.$parent.getFolderContents()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      else {
        alert('信息还没填好吧？')
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/common.less';
.mask {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: .3;
  height: 100vh;
  width: 100vw;
}

.modal {
  position: absolute;
  box-sizing: border-box;
  padding: 0 20px;
  top: 50%;
  left: 50%;
  margin-left: -140px;
  margin-top: -80px;
  width: 280px;
  height: 160px;
  background-color: #fff;
  color: @main-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  input,
  button {
    height: 30px;
    line-height: 30px;
    margin: 2px;
    border: 1px solid @main-color;
  }
  input {
    width: 180px;
    padding: 0 20px;
    color: @main-color;
  }
  button {
    width: 90px;
    background-color: @main-color;
    color: #fff;
  }
}
</style>