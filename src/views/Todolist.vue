<template>
  <div class="todolist">
    <header>
      <span class="title">biaoti</span>
      <div class="right-btn">
        <i class="iconfont icon-pen"></i>
      </div>
    </header>
    <ul class="items">
      <li v-for="item in testData" class="item" @click="complete" data-id="xxx" :class="{complete:item.isComplete}">
        {{item.thing}}
      </li>
      <li class="item">
        <input>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testData: [
        { thing: '今天也要学习javascript', isComplete: true },
        { thing: '今天也要学习健身', isComplete: false }
      ]
    }
  },
  mounted(){
    this.getFolderContents()
  },
  methods: {
    complete(e) {
      console.log(e.currentTarget.dataset.id, this.temp)
    },
    getFolderContents() {
      axios.get('http://120.76.217.199:8080/api/folder/todolist/' + this.currentFolder)
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
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
.todolist {
  header {
    .commonheader(@bgcolor: @maincolor, @fontcolor: #fff);
  }
  .items {
    background-image: url('../assets/line.png');
    background-size: 100vw 60px;
    position: relative;
    .complete {
      text-decoration: line-through;
    }
    .item {
      box-sizing: border-box;
      color: @maincolor;
      font-size: 20px;
      padding: 0 20px;
      line-height: 60px;
      word-wrap: break-word;
      &:before {
        content: '·'
      }
      input {
        display: inline-block;
        width: 95%;
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