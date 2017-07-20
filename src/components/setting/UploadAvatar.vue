<template>
  <transition name="fade">
    <div v-show="isModalShow">
      <div class="mask" @click="isModalShow = !isModalShow"></div>
      <div class="modal">
        <croppa v-model="myCroppa" :width="280" :height="280" :show-remove-button="false" :quality="1"></croppa>
        <div class="button-set">
          <button @click="isModalShow = !isModalShow">取消</button>
          <button @click="remove">清空</button>
          <button @click="upload">确定</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import api from '../../api/api-config.js'
import Vue from 'vue'
import Croppa from 'vue-croppa'

Vue.use(Croppa)
export default {
  data () {
    return {
      isModalShow: false,
      myCroppa: {}
    }
  },
  methods: {
    upload () {
      this.myCroppa.generateBlob(blob => {
        console.log(blob)
        var formData = new FormData()
        formData.append('file', blob)
        this.$axios.post(api.uploadavatar, formData)
          .then(res => {
            if (res.data.code === 0) {
              this.isModalShow = false
              this.$parent.getInfo()
              this.myCroppa.remove()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
    remove () {
      this.myCroppa.remove()
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
  margin-left: -150px;
  margin-top: -180px;
  width: 300px;
  height: 360px;
  background-color: #fff;
  color: @main-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  .button-set {
    display: flex;
    align-items: center;
    button {
      height: 30px;
      width: 50px;
      margin: 10px 10px 0 10px;
      border: none;
      color: #fff;
      background-color: @main-color;
    }
  }
}
</style>