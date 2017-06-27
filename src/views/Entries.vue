<template>
  <div id="entries">
    <div class="items">
      <div v-for="item in testdata" v-bind:key="item._id" class="item">
        <div class="dd">
          <p class="date">{{convertToDD(item.createdate)}}</p>
          <p class="day">{{convertToddd(item.createdate)}}</p>
        </div>
        <div class="content">
          <div class="time">{{convertToHHMM(item.createdate)}}</div>
          <div class="title">{{item.title}}</div>
        </div>
        <div class="state">
          <i class="iconfont" :class="'icon-'+ item.weather"></i>
          <i class="iconfont" :class="'icon-'+ item.mood"></i>
          <i class="iconfont icon-bookmark"></i>
        </div>
      </div>
    </div>
    <footer>
      <div class="buttons">{{currentFolder}}</div>
      <div class="total">1 Entries</div>
    </footer>
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue'
var moment = require('moment');
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      testdata: [
        {
          "_id": "594785c8887da62d86d8235b",
          "folderId": "594782856659ac2d39589508",
          "title": "第二篇日记2",
          "content": "something happend",
          "mood": "kaixin-",
          "weather": "baoxue",
          "createdate": "2017-06-18",
          "__v": 0,
          "pic": []
        },
        {
          "_id": "594785d3887da62d86d8235c",
          "folderId": "594782856659ac2d39589508",
          "title": "第一篇日记",
          "content": "something happend",
          "mood": "nanguo",
          "weather": "qingtian",
          "createdate": "2017-06-18",
          "__v": 0,
          "pic": []
        }
      ]
    }
  },
  //钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
  activated() {
    this.getFolderContents();
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder'
  }),
  methods: {
    convertToDD(timestamp) {
      return moment(timestamp).format('DD');
    },
    convertToddd(timestamp) {
      return moment(timestamp).format('ddd');
    },
    convertToHHMM(timestamp) {
      return moment(timestamp).format('HH:MM');
    },
    getFolderContents() {
      console.log(this.currentFolder);
      axios.get('http://120.76.217.199:8080/api/folder/diary/' + this.currentFolder)
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
@import '../less/common.less';
@import '//at.alicdn.com/t/font_7y3xysg41dghw7b9.css';
#entries {
  background-image: url('../assets/52502973_p0.png');
  height: @commoncontainerheight;
  box-sizing: border-box;
  padding: 8px;
  overflow: scroll;
  .item {
    color: @maincolor;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    height: 4.5rem;
    padding: 5px;
    margin-bottom: 8px;
    .dd {
      float: left;
      width: 3rem;
      text-align: center;
      .date {
        font-size: 2rem;
      }
      .day {
        font-size: .8em;
      }
    }
    .content {
      float: left;
      width: ~"calc(100% - 120px)";
      padding-left: 5px;
      .time {
        font-size: .7em;
      }
      .title {
        overflow: hidden;
        height: 1.5rem;
      }
    }
    .state {
      float: right;
      font-weight: bold;
      .icon {
        font-size: 18px;
      }
    }
  }
  footer {
    .diaryfooter;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: Space-between;
    .buttons,
    .total {
      font-size: 1.5rem;
      padding: 0 10px;
    }
  }
}
</style>
