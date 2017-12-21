<template>
  <div id="calendar">
    <swiper class="cadiv" :options="swiperOption">
      <swiper-slide class="date-box">
        <div class="month">{{m(date0).format('MMM')}}</div>
        <div class="date">{{m(date0).format('D')}}</div>
        <div class="day">{{m(date0).format('ddd')}}</div>
      </swiper-slide>
      <swiper-slide class="date-box">
        <div class="month">{{m(date1).format('MMM')}}</div>
        <div class="date">{{m(date1).format('D')}}</div>
        <div class="day">{{m(date1).format('ddd')}}</div>
      </swiper-slide>
      <swiper-slide class="date-box">
        <div class="month">{{m(date2).format('MMM')}}</div>
        <div class="date">{{m(date2).format('D')}}</div>
        <div class="day">{{m(date2).format('ddd')}}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import moment from 'moment'
Vue.use(VueAwesomeSwiper)
export default {
  name: 'calendar',
  data () {
    return {
      m: moment,
      thispage: 0,
      date0: +new Date(),
      date1: '',
      date2: '',
      swiperOption: {
        loop: true,
        onSlideNextStart: (swiper, even) => {
          let realIndex = swiper.realIndex
          let nextIndex = realIndex + 1 > 2 ? 0 : realIndex + 1
          this['date' + nextIndex] =
            this['date' + realIndex] + 1000 * 60 * 60 * 24
        },
        onSlidePrevStart: (swiper, even) => {
          let realIndex = swiper.realIndex
          let prevIndex = realIndex - 1 < 0 ? 2 : realIndex - 1
          this['date' + prevIndex] =
            this['date' + realIndex] - 1000 * 60 * 60 * 24
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/common.less';
@import '~swiper/dist/css/swiper.css';
#calendar {
  background-color: @main-color;
  height: @calendar-container-height;
  .cadiv {
    width: 100vw;
    height: 100vw;
    background-color: #fff;
    color: @main-color;
    text-align: center;
    font-weight: bold;
    .date-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .date {
        font-size: 5rem;
      }
    }
  }
}
</style>
