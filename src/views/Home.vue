<template>
  <div class="home">
    <header>
      <img :src="avatar" alt="avatar" class="img-circle" @click="toSetting">
      <div class="name" @click="toSetting">
        <div class="username">{{username}}</div>
        <div class="nickname">{{nickname}}</div>
      </div>
      <i class="iconfont icon-tianjia" @click="showNewFolderModal"></i>
    </header>
  
    <div id="main">
      <div v-for="item in items" class="item" :data-folderid="item._id" :data-total="item.total" :data-foldername="item.foldername" v-finger:long-tap="showDeleteModal" :data-type="item.type" @click="jump" :key="item._id">
        <i class="iconfont" :class="transferToIcon(item.type)"></i>
        <span>{{item.foldername}}</span>
        <div class="total">
          <span>{{item.total}}</span>
          <i class="iconfont icon-next"></i>
        </div>
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
import vmodal from 'vue-js-modal'
Vue.use(vmodal)
import NewFolderModal from '~/home/NewFolderModal'
import DeleteModal from '~/DeleteModal'

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
  activated () {
    this.getFolder()
    this.getInfo()
  },
  computed: mapState([
    'currentFolder',
    'currentFolderName'
  ]),
  methods: {
    ...mapMutations([
      'changeCurrentFolder',
      'changeCurrentFolderName',
      'changeCurrentCount'
    ]),
    transferToIcon (type) {
      return 'icon-' + (type === 'diary' ? 'book' : type === 'contact' ? 'contact' : type === 'todolist' ? 'alert' : false)
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
      console.log(this.selectedItem)
    },
    jump (event) {
      var dataset = event.currentTarget.dataset
      var type = dataset.type
      var id = dataset.folderid
      var name = dataset.foldername
      var total = dataset.total
      this.changeCurrentFolder(id)
      this.changeCurrentFolderName(name)
      this.changeCurrentCount(total)
      console.log(total)
      if (type === 'diary') { this.$router.push('/diary/entries/') }
      if (type === 'contact') { this.$router.push('/phonebook/') }
      if (type === 'todolist') { this.$router.push('/todolist/') }
    },
    getFolder () {
      this.$axios.get(api.getFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
          }
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteItem () {
      this.$axios.delete(api.deleteFolder + this.selectedItem)
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
      this.$axios.get(api.getinfo)
        .then(res => {
          if (res.data.code === 0) {
            this.username = res.data.data.username
            this.nickname = res.data.data.nickname || '点击设置昵称'
            this.avatar = res.data.data.avatar
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
  padding: 10px 10px;
}

header {
  margin-top: @padding-for-bar;
  box-sizing: border-box;
  height: @home-header-height;
  background-color: @main-color;
  color: #fff;
  img {
    .box();
    height: 100%;
    border-radius: 50%;
  }
  .name {
    .box();
    width: ~"calc(100vw - 110px)";
    overflow-x: scroll;
    .username {
      font-size: 1.3rem;
    }
  }
  i {
    float: right;
    line-height: @home-header-height;
    font-size: 1.5rem;
    padding-right: 10px;
  }
}

#main {
  height: @home-container-height;
  overflow-y: scroll;
  box-sizing: border-box;
  width: 100%;
  .item {
    border-bottom: 1px #ccc solid;
    padding: 10px 10px 10px 0;
    margin-left: 20px;
    line-height: 3rem;
    color: rgb(92, 115, 136);
    height: 3rem;
    .iconfont {
      font-size: 1.5rem;
    }
    .iconfont,
    span {
      vertical-align: middle;
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
  padding: 0 .4rem;
  width: 100vw;
  height: @common-footer-height;
  background-color: #fff;
  border-top: 1px #CACACA solid;
  .inputdiv {
    position: relative;
    width: 100%;
    input {
      padding-top: .4rem;
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
