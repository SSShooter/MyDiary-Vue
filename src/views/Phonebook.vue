<template>
  <div id="phonebook">
    <header>
      <span class="title">{{currentFolderName}}</span>
      <div class="right-btn">
        <i class="iconfont icon-pen"
           @click="showNewContactModal"></i>
      </div>
    </header>
    <div class="container">
      <index></index>
      <div v-for="(item,index) in items">
        <div v-if="!items[index-1] || item.initial !== items[index-1].initial"
             class="initial"
             :id="item.initial">{{item.initial}}</div>
        <div class="item"
             :data-id="item._id"
             v-finger:long-tap="showDeleteModal">
          <div class="name">{{item.contact}}</div>
          <div class="number">{{item.number}}</div>
        </div>
      </div>
    </div>
    <new-contact-modal ref="NewContactModal"></new-contact-modal>
    <delete-modal ref="DeleteModal"></delete-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Index from '../components/contact/Index.vue'
import NewContactModal from '../components/contact/NewContactModal.vue'
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
      contact: '',
      initial: '',
      number: '',
      items: [],
      selectedItem: ''
    }
  },
  activated() {
    this.getFolderContents()
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder',
    currentFolderName: 'getCurrentFolderName'
  }),
  components: {
    Index,
    DeleteModal,
    NewContactModal
  },
  methods: {
    showNewContactModal() {
      this.$refs.NewContactModal.isModalShow = true;
    },
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
      axios.get('http://120.76.217.199:8080/api/folder/phonebook/' + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            this.items = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteItem() {
      axios.delete('http://120.76.217.199:8080/api/phonebook/' + this.selectedItem)
        .then(res => {
          if (res.data.code === 0) {
            console.log(res)
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
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
@import '../less/common.less';
header {
  .commonheader(@bgcolor: #fff, @fontcolor: @maincolor);
}

.container {
  display: flex;
  justify-content: baseline;
  align-items: center;
  flex-direction: column;
  height: @contactcontainerheight;
  background-color: @maincolor;
  box-sizing: border-box;
  overflow: scroll;
  .item {
    padding: 10px 50px;
    background-color: #fff;
    color: @maincolor;
    border-radius: 5px;
    margin: 5px 0;
  }
  .initial {
    text-align: center;
    font-size: 2rem;
    color: #fff;
    font-weight: bold;
  }
}
</style>