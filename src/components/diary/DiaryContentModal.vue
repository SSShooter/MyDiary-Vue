<template>
  <transition name="fadeinout">
    <div v-show="isModalShow">
      <div class="mask" @click="isModalShow=!isModalShow"></div>
      <div class="modal">
        <div class="close" @click="isModalShow=!isModalShow">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="modal-date">
          <span class="month">{{convertToMMMM(item.createdate)}}</span>
          <span class="date">{{convertToD(item.createdate)}}</span>
          <span>{{convertTodddd(item.createdate) + ' ' + convertToYYYY(item.createdate)}}</span>
          <span>{{convertToHHmm(item.createdate)}}</span>
        </div>
        <div class="modal-content" @click.prevent>
          <div class="title">
            <span>{{item.title}}</span>
          </div>
          <span class="content">{{item.content}}</span>
          <div class="img-wrapper">
            <img v-for="pic in item.pic" :src="pic" @click="viewImg">
          </div>
        </div>
        <div class="modal-footer">
          <div>
            <i class="iconfont" :class="'icon-'+ item.weather"></i>
            <i class="iconfont" :class="'icon-'+ item.mood"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import moment from 'moment'
export default {
  props: ['item'],
  data () {
    return {
      isModalShow: false
    }
  },
  methods: {
    convertToMMMM (timestamp) {
      return moment(timestamp).format('MMMM')
    },
    convertToD (timestamp) {
      return moment(timestamp).format('D')
    },
    convertToHHmm (timestamp) {
      return moment(timestamp).format('HH:mm')
    },
    convertToYYYY (timestamp) {
      return moment(timestamp).format('YYYY')
    },
    convertTodddd (timestamp) {
      return moment(timestamp).format('dddd')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/common.less';
.mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  opacity: 0.3;
  z-index: 9;
}

.modal {
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  margin-left: -45vw;
  margin-top: -46vh;
  width: 90vw;
  height: 90vh;
  overflow: hidden;
  background-color: #fff;
  color: @main-color;
  border-radius: 15px;
  border: none;
  z-index: 10;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    color: #fff;
  }
  .modal-date {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    background-color: @main-color;
    color: #fff;
    height: 30%;
    span {
      margin: 1px 0;
      font-size: 0.8rem;
    }
    .date {
      font-size: 4rem;
      line-height: 4rem;
    }
  }
  .modal-content {
    box-sizing: border-box;
    padding: 5px 10%;
    height: 60%;
    overflow-y: scroll;
    .title {
      font-size: 1.5rem;
      text-align: center;
    }
    .content {
      word-break: break-all;
      white-space: pre-wrap;
      color: #545454;
    }
    .img-wrapper {
      margin-top: 20px;
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: 10%;
    background-color: @main-color;
    i {
      font-size: 1.5rem;
      color: #fff;
      padding-left: 10px;
    }
  }
}
</style>