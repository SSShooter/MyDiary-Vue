<template>
  <div v-finger:touch-move="touchMove"
       class="index">
    <div class="alphabet">#</div>
    <div class="alphabet">A</div>
    <div class="alphabet">B</div>
    <div class="alphabet">C</div>
    <div class="alphabet">D</div>
    <div class="alphabet">E</div>
    <div class="alphabet">F</div>
    <div class="alphabet">G</div>
    <div class="alphabet">H</div>
    <div class="alphabet">I</div>
    <div class="alphabet">J</div>
    <div class="alphabet">K</div>
    <div class="alphabet">L</div>
    <div class="alphabet">M</div>
    <div class="alphabet">N</div>
    <div class="alphabet">O</div>
    <div class="alphabet">P</div>
    <div class="alphabet">Q</div>
    <div class="alphabet">R</div>
    <div class="alphabet">S</div>
    <div class="alphabet">T</div>
    <div class="alphabet">U</div>
    <div class="alphabet">V</div>
    <div class="alphabet">W</div>
    <div class="alphabet">X</div>
    <div class="alphabet">Y</div>
    <div class="alphabet">Z</div>
  </div>
</template>
<script>
import Vue from 'vue'
import AlloyFinger from 'alloyfinger/alloy_finger.js'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})
export default {
  methods: {
    touchMove(e) {
      e.preventDefault();//禁止滚动
      var Y = e.changedTouches[0].clientY - document.querySelector('.index').offsetTop;
      var cell = document.querySelector('.index').offsetHeight / 27;
      if (Y < cell) { location.replace('#hash'); }
      else if (Y < cell * 2) { location.replace('#a'); }
      else if (Y < cell * 3) { location.replace('#b'); }
      else if (Y < cell * 4) { location.replace('#c'); }
      else if (Y < cell * 5) { location.replace('#d'); }
      else if (Y < cell * 6) { location.replace('#e'); }
      else if (Y < cell * 7) { location.replace('#f'); }
      else if (Y < cell * 8) { location.replace('#g'); }
      else if (Y < cell * 9) { location.replace('#h'); }
      else if (Y < cell * 10) { location.replace('#i'); }
      else if (Y < cell * 11) { location.replace('#j'); }
      else if (Y < cell * 12) { location.replace('#k'); }
      else if (Y < cell * 13) { location.replace('#l'); }
      else if (Y < cell * 14) { location.replace('#m'); }
      else if (Y < cell * 15) { location.replace('#n'); }
      else if (Y < cell * 16) { location.replace('#o'); }
      else if (Y < cell * 17) { location.replace('#p'); }
      else if (Y < cell * 18) { location.replace('#q'); }
      else if (Y < cell * 19) { location.replace('#r'); }
      else if (Y < cell * 20) { location.replace('#s'); }
      else if (Y < cell * 21) { location.replace('#t'); }
      else if (Y < cell * 22) { location.replace('#u'); }
      else if (Y < cell * 23) { location.replace('#v'); }
      else if (Y < cell * 24) { location.replace('#w'); }
      else if (Y < cell * 25) { location.replace('#x'); }
      else if (Y < cell * 26) { location.replace('#y'); }
      else if (Y < cell * 27) { location.replace('#z'); }
    }
  }
}
</script>
<style lang="less">
@import '../../less/common.less';
.index {
  position: fixed;
  left: 0;
  width: 22px;
  height: @contact-container-height;
  padding-left: 5px;
  .alphabet {
    height: 3.7%;
    color: #fff;
  }
}
</style>
