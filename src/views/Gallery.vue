<template>
  <div class="root">
    <div class="imgwrapper" :class="{normal:!isZoomIn}">
      <img :src="large" @click="plus" :class="{img:!isZoomIn}">
    </div>
    <div class="imglist">
      <div v-for="img in imglist" @click="changeImg" class="thumbwrapper">
        <img :src="img">
      </div>
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
      imglist: ["http://www.time-record.net:8080/1498102597917NMzb.jpg", "http://www.time-record.net:8080/1498131919564CCJ2.jpg", "http://www.time-record.net:8080/1498102597917NMzb.jpg"],
      large: "http://www.time-record.net:8080/1498102597917NMzb.jpg",
      isZoomIn: false
    }
  },
  methods: {
    changeImg(e) {
      this.large = e.target.src;
    },
    plus() {
      this.isZoomIn = !this.isZoomIn;
    }
  }
}
</script>

<style lang="less" scoped>
.imgwrapper {
  height: ~'calc(100vh - 100px)';
  width: 100vw;
  overflow: auto;
}

.normal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img {
  width: 100%;
}

.imglist {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100vw;
  overflow-x: scroll;
  height: 100px;
  .thumbwrapper {
    height: 90px;
    img {
      height: 100%;
    }
  }
}
</style>