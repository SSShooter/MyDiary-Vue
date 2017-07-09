<template>
  <transition name="fade">
    <div v-show="isModalShow">
      <div class="mask" @click="isModalShow=!isModalShow"></div>
      <div class="modal">
        <div class="close" @click="isModalShow=!isModalShow">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <slot></slot>
      </div>
    </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      isModalShow: false
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
  top: 50%;
  left: 50%;
  margin-left: -45vw;
  margin-top: -45vh;
  width: 90vw;
  height: 90vh;
  overflow: hidden;
  background-color: #fff;
  color: @main-color;
  border-radius: 15px;
  border: none;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    color: #fff;
  }
}
</style>