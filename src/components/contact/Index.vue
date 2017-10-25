<template>
  <div v-finger:touch-move="touchMove"
       class="index">
    <div v-for="alphabet in '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'" :key="alphabet" class="alphabet">{{alphabet}}</div>
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
    touchMove (e) {
      e.preventDefault() // 禁止滚动
      let Y =
        e.changedTouches[0].clientY - document.querySelector('.index').offsetTop
      let percentage = Y / document.querySelector('.index').offsetHeight
      let list = [
        '#',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
      let selected = list[~~(percentage * 27)]
      let selectedDiv = document.querySelector(
        '[data-alphabet="' + selected + '"]'
      )
      if (selectedDiv) {
        selectedDiv.scrollIntoView()
      }
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
