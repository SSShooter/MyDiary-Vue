<template>
  <div class="home">
    <header>
      <img src="http://tva1.sinaimg.cn/crop.316.53.496.496.180/686d7361jw1f3q2lpig4cj20vk0hswn3.jpg" alt="avatar" class="img-circle">
      <div class="name">
        <div class="nickname">{{nickname}}</div>
        <div class="realname">{{realname}}</div>
      </div>
      <i class="iconfont icon-tianjia" @click="showNewFolderModal"></i>
    </header>
  
    <div id="main">
      <div v-for="item in items" class="item" :data-folderid="item._id" :data-foldername="item.foldername" :data-type="item.type" @click="jump" :key="item._id">
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
      <i class="iconfont icon-setting cog" @click="showSettingPanel"></i>
    </footer>
  
    <setting-panel ref="SettingPanel"></setting-panel>
    <new-folder-modal></new-folder-modal>
  </div>
</template>
<script>
import api from '../api/api-config.js'
import Vue from 'vue'
import axios from 'axios';
import { mapState } from 'vuex'
import vmodal from 'vue-js-modal'
Vue.use(vmodal)
import SettingPanel from '../components/home/SettingPanel.vue'
import NewFolderModal from '../components/home/NewFolderModal.vue'


export default {
  components: {
    SettingPanel,
    NewFolderModal
  },
  data() {
    return {
      nickname: '立花　瀧',
      realname: 'たちばな　たき',
      items: [],
      list: []
    }
  },
  activated() {
    this.getFolder();
  },
  computed: mapState([
    'currentFolder',
    'currentFolderName'
  ]),
  methods: {
    transferToIcon(type) {
      return 'icon-' + (type === 'diary' ? 'book' : type === 'contact' ? 'contact' : type === 'todolist' ? 'alert' : false);
    },
    showNewFolderModal() {
      this.$modal.show('new-folder');
    },
    showSettingPanel() {
      this.$refs.SettingPanel.isModalShow = true;
    },
    jump(event) {
      var type = event.currentTarget.dataset.type,
        id = event.currentTarget.dataset.folderid,
        name = event.currentTarget.dataset.foldername
      this.$store.commit('changeCurrentFolder', id)
      this.$store.commit('changeCurrentFolderName', name)
      if (type === 'diary')
        this.$router.push('/diary/entries/');
      if (type === 'contact')
        this.$router.push('/phonebook/');
      if (type === 'todolist')
        this.$router.push('/todolist/');
    },
    getFolder() {
      axios.get(api.getFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
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
@import '//at.alicdn.com/t/font_mznevhjpmzp5vcxr.css';
@headerheight: 6rem;
@black: #3c3c3c;
.box() {
  float: left;
  box-sizing: border-box;
  padding: 10px 10px;
}

header {
  padding-top: @paddingforbar;
  box-sizing: border-box;
  height: @headerheight;
  width: 100vw;
  background-color: @maincolor;
  color: #fff;
  img {
    .box();
    height: 100%;
    border-radius: 50%;
  }
  .name {
    .box();
    .nickname {
      font-size: 1.2rem;
    }
  }
  i{
    float: right;
    line-height: @headerheight - @paddingforbar;
    font-size: 1.5rem;
    padding-right: 10px;
  }
}

#main {
  height: ~"calc(100vh - 96px - 2.8rem)";
  overflow: scroll;
  box-sizing: border-box;
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
  height: 2.8rem;
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
      background-color: @maincolor;
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
    color: @maincolor;
    font-size: 24px;
  }
}
</style>
