<template>
    <div class="item">
        <div class="dd">
            <p class="date">{{convertToDD(item.createdate)}}</p>
            <p class="day">{{convertToddd(item.createdate)}}</p>
        </div>
        <div class="content">
            <div class="time">{{convertToHHmm(item.createdate)}}</div>
            <div class="title">{{item.title}}</div>
            <div class="article">{{item.content}}</div>
        </div>
        <div class="state">
            <i class="iconfont" :class="'icon-'+ item.weather"></i>
            <i class="iconfont" :class="'icon-'+ item.mood"></i>
            <i class="iconfont icon-bookmark"></i>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['item'],
  methods: {
    convertToDD (timestamp) {
      return moment(timestamp).format('DD')
    },
    convertToddd (timestamp) {
      return moment(timestamp).format('ddd')
    },
    convertToHHmm (timestamp) {
      return moment(timestamp).format('HH:mm')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/less/common.less';
.item {
  color: @main-color;
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
      font-size: 0.8em;
    }
  }
  .content {
    float: left;
    width: ~'calc(100% - 120px)';
    padding-left: 5px;
    .time {
      font-size: 0.7em;
    }
    .title,
    .article {
      overflow: hidden;
      text-overflow: ellipsis;
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
</style>
