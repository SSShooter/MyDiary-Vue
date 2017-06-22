<template>
  <div>
    <div class="imgwrapper" v-for="img in imglist">
      <img :src="img"/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
export default {
  data() {
    return {
      imglist: ["http://www.time-record.net:8080/1498102597917NMzb.jpg"]
    }
  },

}
</script>

<style lang="less" scoped>
.imgwrapper {
  width: 100vw;
  img {
    width: 100%;
  }
}
</style>