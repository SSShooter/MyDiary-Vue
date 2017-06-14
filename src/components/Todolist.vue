<template>
  <div class="todolist">
    <header>
      <span class="title">biaoti</span>
      <div class="add">
        <i class="iconfont icon-pen"></i>
      </div>
    </header>
    <ul class="items">
      <li class="item">
        ※ hfdiaeohofha
      </li>
      <li class="item">
        ※ hfdiaeohofha
      </li>
      <li class="item">
        ※ hfdiaeohofha
      </li>
      <li class="item">
        <input />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
@import './common.less';
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
.todolist {
  header {
    .commonheader;
    background-color: @maincolor;
    text-align: center;
    font-size: 1.8rem;
    color: #fff;
    position: relative;
    .title {
      line-height: @commonheaderheight;
    }
    .add {
      position: absolute;
      bottom: 0;
      right: 0;
      height: @commonheaderheight;
      padding-right: 10px;
      .iconfont {
        line-height: @commonheaderheight;
        font-size: 1.5rem;
      }
    }
  }
  .items {
    background-image: url('../assets/line.png');
    background-size: 100vw 60px;
    position: relative;
    .item {
      box-sizing: border-box;
      color: @maincolor;
      font-size: 20px;
      padding: 0 20px;
      line-height: 60px;
      word-wrap: break-word;
      input {
        display: inline-block;
        width: 100%;
        color: @maincolor;
        font-size: 20px;
        outline: none;
        line-height: 30px;
        border: none;
      }
    }
  }
}
</style>