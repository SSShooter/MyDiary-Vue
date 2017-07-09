<template>
  <transition name="fade">
    <div v-show="isModalShow">
      <div class="mask"
           @click="isModalShow=!isModalShow"></div>
      <div class="modal">
        <i class="iconfont icon-tianjia"></i>
        <i class="iconfont icon-theme"></i>
        <i class="iconfont icon-gerenzhongxin"></i>
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
  bottom: 2.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: @main-color;
  color: #fff;
  width: 100vw;
  padding: 10px 0;
  .iconfont {
    font-size: 1.5rem;
  }
}
</style>