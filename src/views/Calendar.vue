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
var moment = require('moment');
export default {
  name: 'calendar',
  data() {
    return {
      moment: moment(),
      thispage: 0,
      month: moment().format('MMM'),
      date: moment().format('DD'),
      day: moment().format('ddd'),
      month2: '',
      date2: '',
      day2: '',
      theWayToSkipTheFirstRunOfOnSlideNextStart: 0,
      swiperOption: {
        loop: true,
        onSlideNextStart: () => {
          if (this.theWayToSkipTheFirstRunOfOnSlideNextStart === 0) {
            this.theWayToSkipTheFirstRunOfOnSlideNextStart = 1;
            return false;
          }
          console.log('next');
          console.log(this.thispage);
          this.moment = this.moment.add(1, 'd');
          if (this.thispage == 0) {
            this.month2 = this.moment.format('MMM');
            this.date2 = this.moment.format('DD');
            this.day2 = this.moment.format('ddd');
            this.thispage = 1;
          } else {
            this.month = this.moment.format('MMM');
            this.date = this.moment.format('DD');
            this.day = this.moment.format('ddd');
            this.thispage = 0;
          }
        },
        onSlidePrevStart: () => {
          console.log('prev');
          console.log(this.thispage);
          this.moment = this.moment.subtract(1, 'd');
          if (this.thispage == 0) {
            this.month2 = this.moment.format('MMM');
            this.date2 = this.moment.format('DD');
            this.day2 = this.moment.format('ddd');
            this.thispage = 1;
          } else {
            this.month = this.moment.format('MMM');
            this.date = this.moment.format('DD');
            this.day = this.moment.format('ddd');
            this.thispage = 0;
          }
        }
      }
    }
  },
  methods: {
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
  background-color: @maincolor;
  height: @commoncontainerheight;
  .cadiv {
    width: 100vw;
    height: 100vw;
    background-color: #fff;
    color: @maincolor;
    text-align: center;
    font-weight: bold;
    .date {
      font-size: 5rem;
    }
  }
}
</style>
