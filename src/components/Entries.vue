<template>
  <div id="entries">
    <div class="item">
      <div class="dd">
        <p class="date">13</p>
        <p class="day">Thu</p>
      </div>
      <div class="content">
        <div class="time">20:04</div>
        <div class="title">我的project</div>
      </div>
      <div class="state">
        <i class="iconfont icon-baoxue"></i>
        <i class="iconfont icon-kaixin-"></i>
        <i class="iconfont icon-bookmark"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {

}
</script>
<style lang="less">
@import './common.less';
@import '//at.alicdn.com/t/font_7y3xysg41dghw7b9.css';
#entries {
  background-image: url('../assets/52502973_p0.png');
  height: @diarycontainerheight;
  box-sizing: border-box;
  padding: 8px;
  .item {
    color: @maincolor;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    height: 4.5rem;
    padding: 5px;
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
}
</style>
