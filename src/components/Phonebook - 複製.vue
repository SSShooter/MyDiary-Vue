<template>
  <div id="phonebook">
    <header>
      <span class="title">biaoti</span>
      <div class="right-btn">
        <i class="iconfont icon-pen"></i>
      </div>
    </header>
    <div class="container">
      <div v-finger:touch-move="touchMove"
           id="index">
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
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
    </div>
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
  data() {
    return {
    }
  },
  mounted(){
    this.getFolderContents()
  },
  methods: {
    touchMove(e) {
      e.preventDefault();//禁止滚动
      var Y = e.changedTouches[0].clientY - document.querySelector('#index').offsetTop;
      var cell = document.querySelector('#index').offsetHeight / 27;
      if (Y < cell) { console.log('hash'); }
      else if (Y < cell * 2) { console.log('a'); }
      else if (Y < cell * 3) { console.log('b'); }
      else if (Y < cell * 4) { console.log('c'); }
      else if (Y < cell * 5) { console.log('d'); }
      else if (Y < cell * 6) { console.log('e'); }
      else if (Y < cell * 7) { console.log('f'); }
      else if (Y < cell * 8) { console.log('g'); }
      else if (Y < cell * 9) { console.log('h'); }
      else if (Y < cell * 10) { console.log('i'); }
      else if (Y < cell * 11) { console.log('j'); }
      else if (Y < cell * 12) { console.log('k'); }
      else if (Y < cell * 13) { console.log('l'); }
      else if (Y < cell * 14) { console.log('m'); }
      else if (Y < cell * 15) { console.log('n'); }
      else if (Y < cell * 16) { console.log('o'); }
      else if (Y < cell * 17) { console.log('p'); }
      else if (Y < cell * 18) { console.log('q'); }
      else if (Y < cell * 19) { console.log('r'); }
      else if (Y < cell * 20) { console.log('s'); }
      else if (Y < cell * 21) { console.log('t'); }
      else if (Y < cell * 22) { console.log('u'); }
      else if (Y < cell * 23) { console.log('v'); }
      else if (Y < cell * 24) { console.log('w'); }
      else if (Y < cell * 25) { console.log('x'); }
      else if (Y < cell * 26) { console.log('y'); }
      else if (Y < cell * 27) { console.log('z'); }
    },
    scroll(x) {
      if (document.getElementById(x)) {
        $("html,body").animate({ scrollTop: $("#" + x).offset().top - 88 }, 10);
      } else { return; }
    },
    getFolderContents() {
      axios.get('http://120.76.217.199:8080/api/folder/phonebook/' + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.testdata = res.data.data
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
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
@import './common.less';
header {
  .commonheader(@bgcolor: #fff, @fontcolor: @maincolor);
}

.container {
  height: @contactcontainerheight;
  background-color: @maincolor;
  box-sizing: border-box;
  #index {
    position: fixed;
    width: 22px;
    height: @contactcontainerheight;
    padding-left: 5px;
    .alphabet {
      height: 3.7%;
      color: #fff;
    }
  }
}
.item {
  margin-left: 30px;
}
</style>