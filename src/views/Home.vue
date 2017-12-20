<template>
  <div class="home">
    <header>
      <img :src="avatar" class="img-circle" @click="toSetting">
      <div class="name" @click="toSetting">
        <div class="username">{{username}}</div>
        <div class="nickname">{{nickname}}</div>
      </div>
      <i class="iconfont icon-tianjia" @click="showNewFolderModal"></i>
    </header>

    <div id="main">
      <div class="scroll-content">
        <div v-for="item in items" class="item" :data-folderid="item._id" :data-total="item.total" :data-foldername="item.foldername" v-finger:long-tap="showDeleteModal" :data-type="item.type" @click="jump" :key="item._id">
          <i class="iconfont" :class="transferToIcon(item.type)"></i>
          <span>{{item.foldername}}</span>
          <span class="total">
            <span>{{item.total}}</span>
            <i class="iconfont icon-next"></i>
          </span>
        </div>
      </div>
      <div class="scrollbar-track scrollbar-track-y">
        <div class="scrollbar-thumb scrollbar-thumb-y"></div>
      </div>
    </div>

    <div id="search-result" class="container">
    </div>

    <footer>
      <div class="inputdiv">
        <i class="iconfont icon-search search"></i>
        <input type="text" name="search" id="search">
      </div>
      <i class="iconfont icon-setting cog" @click="toSetting"></i>
    </footer>

    <new-folder-modal></new-folder-modal>
    <delete-modal ref="DeleteModal"></delete-modal>
  </div>
</template>
<script>
import api from '../api/api-config.js'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import NewFolderModal from '~/home/NewFolderModal'
import DeleteModal from '~/DeleteModal'
import Scrollbar from 'smooth-scrollbar'
import vmodal from 'vue-js-modal'
Vue.use(vmodal)

export default {
  components: {
    NewFolderModal,
    DeleteModal
  },
  data () {
    return {
      username: '',
      nickname: '',
      avatar: '',
      items: [],
      selectedItem: ''
    }
  },
  mounted () {
    Scrollbar.init(document.querySelector('#main'))
  },
  activated () {
    this.getFolder()
    this.getInfo()
  },
  computed: mapState(['currentFolder', 'currentFolderName']),
  methods: {
    ...mapMutations([
      'changeCurrentFolder',
      'changeCurrentFolderName',
      'changeCurrentCount'
    ]),
    transferToIcon (type) {
      return (
        'icon-' +
        (type === 'diary'
          ? 'book'
          : type === 'contact'
            ? 'contact'
            : type === 'todolist' ? 'alert' : false)
      )
    },
    showNewFolderModal () {
      this.$modal.show('new-folder')
    },
    toSetting () {
      this.$router.push('/setting')
    },
    showDeleteModal (e) {
      this.$refs.DeleteModal.isModalShow = true
      var target = e.target
      while (!target.dataset.folderid) {
        if (target.dataset.folderid) {
          break
        }
        target = target.parentNode
      }
      this.selectedItem = target.dataset.folderid
    },
    jump (event) {
      var dataset = event.currentTarget.dataset
      let { type, folderid: id, foldername: name, total } = dataset
      this.changeCurrentFolder(id)
      this.changeCurrentFolderName(name)
      this.changeCurrentCount(total)
      if (type === 'diary') {
        this.$router.push('/diary/entries/')
      }
      if (type === 'contact') {
        this.$router.push('/phonebook/')
      }
      if (type === 'todolist') {
        this.$router.push('/todolist/')
      }
    },
    getFolder () {
      this.$axios
        .get(api.getFolder)
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
      this.$axios
        .delete(api.deleteFolder + this.selectedItem)
        .then(res => {
          if (res.data.code === 0) {
            this.getFolder()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getInfo () {
      this.$axios
        .get(api.getinfo)
        .then(res => {
          if (res.data.code === 0) {
            this.username = res.data.data.username
            this.nickname = res.data.data.nickname || '点击设置昵称'
            this.avatar = res.data.data.avatar || '/static/avatar63808612.jpg'
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
@black: #3c3c3c;
.box() {
  float: left;
  box-sizing: border-box;
  padding: 40/75rem;
}

header {
  box-sizing: border-box;
  margin-top: @padding-for-bar;
  height: @home-header-height;
  background-color: @main-color;
  color: #fff;
  img {
    .box();
    height: @home-header-height;
    width: @home-header-height;
    border-radius: 50%;
  }
  .name {
    .box();
    width: ~'calc(100vw - 110px)';
    overflow-x: auto;
    .username {
      font-size: 1.3rem;
    }
  }
  i {
    float: right;
    line-height: @home-header-height;
    font-size: 1.5rem;
    padding-right: 40/75rem;
  }
}

#main {
  height: @home-container-height;
  overflow: auto;
  width: 100%;
  .item {
    // home的item的点击阴影
    &:active {
      background-color: #eeeeee;
    }
    padding: 10px;
    line-height: 2.5rem;
    color: rgb(92, 115, 136);
    height: 2.5rem;
    overflow: hidden;
    margin-bottom: 1px; // 留出阴影位置
    box-shadow: 20px 1px #ccc; // 模拟border-bottom
    .iconfont {
      font-size: 1.5rem;
    }
    .total {
      float: right;
    }
  }
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0.4rem;
  width: 100vw;
  height: @common-footer-height;
  background-color: #fff;
  border-top: 1px #cacaca solid;
  .inputdiv {
    position: relative;
    width: 100%;
    input {
      padding-top: 0.4rem;
      width: 95%;
      box-sizing: border-box;
      border: none;
      border-radius: 10px;
      background-color: @main-color;
      padding-left: 30px;
      font-size: 20px;
      line-height: 28px;
    }
    .search {
      position: absolute;
      top: 50%;
      margin-top: -12px;
      left: 5px;
      line-height: 24px;
    }
  }
  .search,
  input {
    color: #fff;
  }
  .cog {
    color: @main-color;
    font-size: 24px;
  }
}
</style>
