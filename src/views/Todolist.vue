<template>
  <div class="todolist">
    <header>
      <span class="title">{{currentFolderName}}</span>
      <div class="right-btn">
        <i class="iconfont icon-pen"
           @click="isInputShow = !isInputShow"></i>
      </div>
    </header>
    <ul class="items">
      <li v-for="item in items"
          v-finger:long-tap="showDeleteModal"
          class="item"
          @click="changeState"
          :key="item._id"
          :data-id="item._id"
          :class="{complete:item.state}">
        {{item.content}}
      </li>
      <li v-show="isInputShow"
          class="item">
        <input v-model.lazy="newTodoItem">
      </li>
    </ul>
    <delete-modal ref="DeleteModal"></delete-modal>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../api/api-config.js'
import { mapGetters } from 'vuex'
import DeleteModal from '../components/DeleteModal.vue'

import Vue from 'vue'
import AlloyFinger from 'alloyfinger/alloy_finger.js'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})

export default {
  data() {
    return {
      isInputShow: false,
      newTodoItem: '',
      items: []
    }
  },
  components: {
    DeleteModal
  },
  activated() {
    this.isInputShow = false;
    this.getFolderContents()
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder',
    currentFolderName: 'getCurrentFolderName'
  }),
  watch: {
    newTodoItem() {
      this.newTodo();
    }
  },
  methods: {
    showDeleteModal(e) {
      this.$refs.DeleteModal.isModalShow = true;
      if (e.target.dataset.id) {
        this.selectedItem = e.target.dataset.id;
      } else {
        this.selectedItem = e.target.parentNode.dataset.id;
      }
      console.log(this.selectedItem)
    },
    getFolderContents() {
      axios.get(api.getListContents + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteItem() {
      axios.delete(api.deleteList + this.selectedItem)
        .then(res => {
          if (res.data.code === 0) {
            console.log(res)
            this.getFolderContents()
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
      axios.post(api.newList, data)
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
      axios.put(api.changeListItemState + e.currentTarget.dataset.id)
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