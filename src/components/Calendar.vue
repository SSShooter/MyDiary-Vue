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
var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export default {
  name: 'calendar',
  data() {
    return {
      moment: moment(),
      thispage: 0,
      month: monthArr[moment().month()],
      date: moment().date(),
      day: dayArr[moment().day()],
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
            this.month2 = monthArr[this.moment.month()];
            this.date2 = this.moment.date();
            this.day2 = dayArr[this.moment.day()];
            this.thispage = 1;
          } else {
            this.month = monthArr[this.moment.month()];
            this.date = this.moment.date();
            this.day = dayArr[this.moment.day()];
            this.thispage = 0;
          }
        },
        onSlidePrevStart: () => {
          console.log('prev');
          console.log(this.thispage);
          this.moment = this.moment.subtract(1, 'd');
          if (this.thispage == 0) {
            this.month2 = monthArr[this.moment.month()];
            this.date2 = this.moment.date();
            this.day2 = dayArr[this.moment.day()];
            this.thispage = 1;
          } else {
            this.month = monthArr[this.moment.month()];
            this.date = this.moment.date();
            this.day = dayArr[this.moment.day()];
            this.thispage = 0;
          }
        }
      }
    }
  },
  methods: {
    onSwipeLeft: function (e) {
      this.moment = this.moment.add(1, 'd');
      this.month = monthArr[this.moment.month()];
      this.date = this.moment.date();
      this.day = dayArr[this.moment.day()];
      console.log(this.month, this.date, this.day)
    }
  }
}
</script>
<style lang="less" scoped>
@import './common.less';
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
