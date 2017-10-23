<template>
  <div id="calendar">
    <swiper class="cadiv"
            :options="swiperOption">
      <swiper-slide class="date-box">
        <div class="month">{{month}}</div>
        <div class="date">{{date}}</div>
        <div class="day">{{day}}</div>
      </swiper-slide>
      <swiper-slide class="date-box">
        <div class="month">{{month2}}</div>
        <div class="date">{{date2}}</div>
        <div class="day">{{day2}}</div>
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
    let mo = moment()
    return {
      moment: mo,
      thispage: 0,
      month: mo.format('MMM'),
      date: mo.format('D'),
      day: mo.format('ddd'),
      month2: '',
      date2: '',
      day2: '',
      theWayToSkipTheFirstRunOfOnSlideNextStart: 0,
      swiperOption: {
        loop: true,
        onSlideNextStart: () => {
          if (this.theWayToSkipTheFirstRunOfOnSlideNextStart === 0) {
            this.theWayToSkipTheFirstRunOfOnSlideNextStart = 1
            return false
          }
          this.moment = this.moment.add(1, 'd')
          if (this.thispage === 0) {
            this.month2 = this.moment.format('MMM')
            this.date2 = this.moment.format('D')
            this.day2 = this.moment.format('ddd')
            this.thispage = 1
          } else {
            this.month = this.moment.format('MMM')
            this.date = this.moment.format('D')
            this.day = this.moment.format('ddd')
            this.thispage = 0
          }
        },
        onSlidePrevStart: () => {
          this.moment = this.moment.subtract(1, 'd')
          if (this.thispage === 0) {
            this.month2 = this.moment.format('MMM')
            this.date2 = this.moment.format('D')
            this.day2 = this.moment.format('ddd')
            this.thispage = 1
          } else {
            this.month = this.moment.format('MMM')
            this.date = this.moment.format('D')
            this.day = this.moment.format('ddd')
            this.thispage = 0
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../less/common.less';
@import '../../node_modules/swiper/dist/css/swiper.css';
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
