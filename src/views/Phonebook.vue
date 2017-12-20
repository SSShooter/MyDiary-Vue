<template>
  <div id="phonebook">
    <header>
      <div class="left-btn">
        <i class="iconfont icon-prev" @click="$router.go(-1)"></i>
      </div>
      <span class="title">{{currentFolderName}}</span>
      <div class="right-btn">
        <i class="iconfont icon-pen" @click="showNewContactModal"></i>
      </div>
    </header>
    <div class="container">
      <index></index>
      <div v-for="(item,index) in items" class="wrap" :key="item.initial">
        <div :data-alphabet="item.initial.toUpperCase()"  v-if="!items[index-1] || item.initial !== items[index-1].initial" class="initial">{{item.initial.toUpperCase()}}</div>
        <div class="item" :data-id="item._id" v-finger:long-tap="showDeleteModal">
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
import api from '../api/api-config.js'
import { mapGetters } from 'vuex'
import Index from '~/contact/Index'
import NewContactModal from '~/contact/NewContactModal'
import DeleteModal from '~/DeleteModal'

export default {
  data () {
    return {
      contact: '',
      initial: '',
      number: '',
      items: [],
      selectedItem: ''
    }
  },
  activated () {
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
    showNewContactModal () {
      this.$refs.NewContactModal.isModalShow = true
    },
    showDeleteModal (e) {
      this.$refs.DeleteModal.isModalShow = true
      var target = e.target
      while (!target.dataset.id) {
        if (target.dataset.id) {
          break
        }
        target = target.parentNode
      }
      this.selectedItem = target.dataset.id
    },
    getFolderContents () {
      this.$axios.get(api.getContactContents + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteItem () {
      this.$axios.delete(api.deleteContact + this.selectedItem)
        .then(res => {
          if (res.data.code === 0) {
            this.getFolderContents()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/common.less';
header {
  .commonheader(@bgcolor: #fff, @fontcolor: @main-color);
}

.container {
  display: flex;
  justify-content: baseline;
  align-items: center;
  flex-direction: column;
  height: @contact-container-height;
  background-color: @main-color;
  box-sizing: border-box;
  overflow: scroll;
  .wrap {
    width: 70%;
    .item {
      padding: 10px;
      background-color: #fff;
      color: @main-color;
      border-radius: 5px;
      margin: 5px 0;
      .name {
        font-size: 1.8rem;
        text-align: left;
      }
      .number {
        font-size: .9;
        text-align: right;
      }
    }
    .initial {
      text-align: center;
      font-size: 2rem;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>