<template>
  <div class="todolist">
    <header>
      <span class="title">biaoti</span>
      <div class="right-btn">
        <i class="iconfont icon-pen" @click="isInputShow = !isInputShow"></i>
      </div>
    </header>
    <ul class="items">
      <li v-for="item in items" class="item" @click="changeState" :key="item._id" :data-id="item._id" :class="{complete:item.state}">
        {{item.content}}
      </li>
      <li v-show="isInputShow" class="item">
        <input v-model.lazy="newTodoItem">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isInputShow: false,
      newTodoItem: '',
      items: []
    }
  },
  activated() {
    this.isInputShow = false;
    this.getFolderContents()
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder'
  }),
  watch: {
    newTodoItem() {
      this.newTodo();
    }
  },
  methods: {
    complete(e) {
      console.log(e.currentTarget.dataset.id, this.temp)
    },
    getFolderContents() {
      axios.get('http://120.76.217.199:8080/api/folder/todolist/' + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newTodo() {
      if (!this.newTodoItem) return false
      let data = {
        folderId: this.currentFolder,
        content: this.newTodoItem,
        createdate: +new Date()
      }
      axios.post('http://120.76.217.199:8080/api/todolist', data)
        .then(res => {
          if (res.data.code === 0) {
            this.getFolderContents()
            this.newTodoItem = ''
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeState(e) {
      axios.put('http://120.76.217.199:8080/api/todolist/' + e.currentTarget.dataset.id)
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.getFolderContents()
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