<template>
  <transition name="fade">
    <div v-show="isModalShow">
      <div class="mask"
           @click="isModalShow=!isModalShow"></div>
      <div class="modal">
        <input v-model="contact"
               placeholder="姓名">
        <input v-model="number"
               placeholder="联系方式">
        <button>确定</button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      isModalShow: false,
      contact: '',
      number: ''
    }
  },
  methods: {
    newContact() {
      axios.post('http://120.76.217.199:8080/api/folder', {
        type: this.newFolderType,
        foldername: this.newFolderName,
        createdate: +new Date()
      })
        .then(res => {
          if (res.data.code === 0) {
            this.isModalShow = false;
            // this.$parent.getFolder();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/common.less';
@import '//at.alicdn.com/t/font_mznevhjpmzp5vcxr.css';
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
  padding: 20px;
  top: 50%;
  left: 50%;
  margin-left: -140px;
  margin-top: -80px;
  width: 280px;
  height: 160px;
  background-color: #fff;
  color: @maincolor;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 3px;
  input,
  button {
    height: 30px;
    line-height: 30px;
    margin: 2px;
    border: 1px solid @maincolor;
  }
  input {
    width: 180px;
    padding: 0 20px;
    color: @maincolor;
  }
  button {
    width: 90px;
    background-color: @maincolor;
    color: #fff;
  }
}
</style>