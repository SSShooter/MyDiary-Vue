<template>
  <div id="calendar">
    <swiper class="cadiv"
            :options="swiperOption">
      <swiper-slide>
        <div class="month">{{month}}</div>
        <div class="date">{{date}}</div>
        <div class="day">{{day}}</div>
      </swiper-slide>
      <swiper-slide>
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
Vue.use(VueAwesomeSwiper)
var moment = require('moment')
export default {
  name: 'calendar',
  data () {
    return {
      moment: moment(),
      thispage: 0,
      month: moment().format('MMM'),
      date: moment().format('D'),
      day: moment().format('ddd'),
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
.swiper-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

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
    .date {
      font-size: 5rem;
    }
  }
}
</style>
