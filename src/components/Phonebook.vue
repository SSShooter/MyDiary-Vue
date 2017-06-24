<template>
  <div id="phonebook">
    <header>
      <span class="title">biaoti</span>
      <div class="right-btn">
        <i class="iconfont icon-pen"></i>
      </div>
    </header>
    <div class="container">
      <index></index>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="item">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="iniapha" id="a">
        aa
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import Index from './Index.vue'
export default {
  data() {
    return {
    }
  },
  components: {
    'index': Index
  },
  mounted() {
    this.getFolderContents()
  },
  methods: {
    getFolderContents() {
      axios.get('http://120.76.217.199:8080/api/folder/phonebook/' + this.currentFolder)
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
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
@import './common.less';
header {
  .commonheader(@bgcolor: #fff, @fontcolor: @maincolor);
}

.container {
  height: @contactcontainerheight;
  background-color: @maincolor;
  box-sizing: border-box;
}

.item {
  padding: 30px;
}
</style>