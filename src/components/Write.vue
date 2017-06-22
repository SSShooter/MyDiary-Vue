<template>
  <div id="write">
    <div class="calendar">
      <div class="month">{{month}}</div>
      <div class="date">{{date}}</div>
      <div class="day">{{day}} {{time}}</div>
    </div>
    <div class="write">
      <input placeholder="title" />
      <textarea placeholder="content"></textarea>
    </div>
    <footer>
      <i class="iconfont icon-zhaopian" @click="showUploadModal"></i>
      <i class="iconfont icon-baocun"></i>
      <i class="iconfont icon-guanbi"></i>
    </footer>
  
    <modal name="example" :width="300" :height="80" :pivotY=".9">
      <uploader></uploader>
    </modal>
  </div>
</template>

<script>
var moment = require('moment');
import Vue from 'vue'
import Uploader from './Uploader.vue'
import vmodal from 'vue-js-modal'
Vue.use(vmodal)
export default {
  data() {
    return {
      moment: '',
      month: '',
      date: '',
      day: '',
      time: ''
    }
  },
  components: {
    'uploader': Uploader
  },
  mounted() {
    this.moment = moment();
  },
  methods:{
    showUploadModal(){
    this.$modal.show('example');
    }
  },
  watch: {
    moment() {
      this.month = this.moment.format('MMM'),
        this.date = this.moment.format('DD'),
        this.day = this.moment.format('dddd'),
        this.time = this.moment.format('hh:mm')
    }
  }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
@import './common.less';
* {
  box-sizing: border-box;
  outline: none;
}

.calendar {
  height: 180px;
  background-color: @maincolor;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  .date {
    font-size: 4rem;
  }
}

.write {
  padding: 10px;
  input {
    display: block;
    border: none;
    width: 100%;
    line-height: 3rem;
    font-size: 1.5rem;
    outline: none;
    padding-left: 10px;
    border-bottom: @maincolor 1px solid;
  }
  textarea {
    resize: none;
    width: 100%;
    height: 200px;
    margin-top: 10px;
    padding: 10px;
    border: none;
    font-size: 1.2rem;
  }
}

footer {
  .diaryfooter;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: 1.5rem;
    padding: 0 20px;
  }
}
</style>