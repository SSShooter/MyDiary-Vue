<template>
  <div id="calendar">
    <swiper class="cadiv" :options="swiperOption">
      <swiper-slide>
        <div class="month">{{month}}</div>
        <div class="date">{{date}}</div>
        <div class="day">{{day}}</div>
      </swiper-slide>
      <swiper-slide>
        <div>aaaaaaaaaa</div>
      </swiper-slide>
      <swiper-slide>
        <div>aaaaaaaaaa</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
var moment = require('moment');
var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export default {
  data(){
    return {
      moment:moment(),
      month:monthArr[moment().month()],
      date:moment().date(),
      day:dayArr[moment().day()],
      swiperOption: {
        }
    }
  },
  methods:{
    onSwipeLeft:function(e) {
      this.moment = this.moment.add(1, 'd');
      this.month = monthArr[this.moment.month()];
      this.date = this.moment.date();
      this.day = dayArr[this.moment.day()];
      console.log(this.month ,this.date ,this.day )
    }
  }
}
</script>
<style lang="less" scoped>
@import './common.less';
.swiper-container {
  width: 300px!important;
  padding: 50px!important;
}

.swiper-slide {
  background-position: 50%!important;
  background-size: cover!important;
  width: 100%!important;
}

#calendar {
  background-color: @maincolor;
  height: @diarycontainerheight;
  .cadiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
