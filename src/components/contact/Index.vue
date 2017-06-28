<template>
  <div v-finger:touch-move="touchMove" class="index">
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
      if (Y < cell) { location.href = '#hash'; }
      else if (Y < cell * 2) { location.href = '#a'; }
      else if (Y < cell * 3) { location.href = '#b';  }
      else if (Y < cell * 4) { location.href = '#c';  }
      else if (Y < cell * 5) { location.href = '#d';  }
      else if (Y < cell * 6) { location.href = '#e';  }
      else if (Y < cell * 7) { location.href = '#f';  }
      else if (Y < cell * 8) { location.href = '#g';  }
      else if (Y < cell * 9) { location.href = '#h';  }
      else if (Y < cell * 10) { location.href = '#i';  }
      else if (Y < cell * 11) { location.href = '#j';  }
      else if (Y < cell * 12) { location.href = '#k';  }
      else if (Y < cell * 13) { location.href = '#l';  }
      else if (Y < cell * 14) { location.href = '#m';  }
      else if (Y < cell * 15) { location.href = '#n';  }
      else if (Y < cell * 16) { location.href = '#o';  }
      else if (Y < cell * 17) { location.href = '#p';  }
      else if (Y < cell * 18) { location.href = '#q';  }
      else if (Y < cell * 19) { location.href = '#r';  }
      else if (Y < cell * 20) { location.href = '#s';  }
      else if (Y < cell * 21) { location.href = '#t';  }
      else if (Y < cell * 22) { location.href = '#u';  }
      else if (Y < cell * 23) { location.href = '#v';  }
      else if (Y < cell * 24) { location.href = '#w';  }
      else if (Y < cell * 25) { location.href = '#x';  }
      else if (Y < cell * 26) { location.href = '#y';  }
      else if (Y < cell * 27) { location.href = '#z';  }
    },
    scroll(x) {
      if (document.getElementById(x)) {
        $("html,body").animate({ scrollTop: $("#" + x).offset().top - 88 }, 10);
      } else { return; }
    },
  }
}
</script>
<style lang="less">
@import '../../less/common.less';
.index {
  position: fixed;
  left: 0;
  width: 22px;
  height: @contactcontainerheight;
  padding-left: 5px;
  .alphabet {
    height: 3.7%;
    color: #fff;
  }
}
</style>
