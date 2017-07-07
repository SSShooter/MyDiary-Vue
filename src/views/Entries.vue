<template>
  <div id="entries">
  
    <div class="items">
      <div v-for="(item,index) in items" v-finger:long-tap="showDeleteModal" @click="showDiaryContentModal" :key="item._id" :data-index="index" class="item">
        <div class="dd">
          <p class="date">{{convertToDD(item.createdate)}}</p>
          <p class="day">{{convertToddd(item.createdate)}}</p>
        </div>
        <div class="content">
          <div class="time">{{convertToHHmm(item.createdate)}}</div>
          <div class="title">{{item.title}}</div>
          <div class="article">{{item.content}}</div>
        </div>
        <div class="state">
          <i class="iconfont" :class="'icon-'+ item.weather"></i>
          <i class="iconfont" :class="'icon-'+ item.mood"></i>
          <i class="iconfont icon-bookmark"></i>
        </div>
      </div>
    </div>
  
    <footer>
      <div class="buttons"></div>
      <div class="total">1 Entries</div>
    </footer>
  
    <diary-content-modal ref="DiaryContentModal">
      <div class="modal-date" v-if="items[selectedItem]">
        <span class="month">{{convertToMMMM(items[selectedItem].createdate)}}</span>
        <span class="date">{{convertToD(items[selectedItem].createdate)}}</span>
        <span>{{convertTodddd(items[selectedItem].createdate)}}&nbsp;&nbsp;{{convertToYYYY(items[selectedItem].createdate)}}</span>
        <span>{{convertToHHmm(items[selectedItem].createdate)}}</span>
      </div>
      <div class="modal-content" v-if="items[selectedItem]">
        <div class="title">
          <span>{{items[selectedItem].title}}</span>
        </div>
        <span class="content">{{items[selectedItem].content}}</span>
        <div class="img-wrapper">
          <img v-for="pic in items[selectedItem].pic" :src="pic" @click="loadImg">
        </div>
      </div>
      <div class="modal-footer" v-if="items[selectedItem]">
        <div>
          <i class="iconfont" :class="'icon-'+ items[selectedItem].weather"></i>
          <i class="iconfont" :class="'icon-'+ items[selectedItem].mood"></i>
        </div>
      </div>
    </diary-content-modal>
    <delete-modal ref="DeleteModal"></delete-modal>
  </div>
</template>
<script>
import axios from 'axios';
import api from '../api/api-config.js'
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import DiaryContentModal from '../components/diary/DiaryContentModal.vue'
import DeleteModal from '../components/DeleteModal.vue'
var moment = require('moment');

export default {
  data() {
    return {
      selectedItem: '',
      items: [],
      example: {
        "_id": "594785c8887da62d86d8235b",
        "folderId": "594782856659ac2d39589508",
        "title": "第二篇日记2",
        "content": "something happend",
        "mood": "kaixin-",
        "weather": "baoxue",
        "createdate": "2017-06-18",
        "__v": 0,
        "pic": []
      }
    }
  },
  components: {
    DiaryContentModal,
    DeleteModal
  },
  //钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
  activated() {
    this.getFolderContents()
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder'
  }),
  methods: {
    ...mapMutations(
      ['changeCurrentImg']
    ),
    convertToMMMM(timestamp) {
      return moment(timestamp).format('MMMM');
    },
    convertToDD(timestamp) {
      return moment(timestamp).format('DD');
    },
    convertToD(timestamp) {
      return moment(timestamp).format('D');
    },
    convertToddd(timestamp) {
      return moment(timestamp).format('ddd');
    },
    convertToHHmm(timestamp) {
      return moment(timestamp).format('HH:mm');
    },
    convertToYYYY(timestamp) {
      return moment(timestamp).format('YYYY');
    },
    convertTodddd(timestamp) {
      return moment(timestamp).format('dddd');
    },
    showDiaryContentModal(e) {
      this.$refs.DiaryContentModal.isModalShow = true;
      var target = e.target
      while (!target.dataset.index) {
        if (target.dataset.index) {
          break
        }
        target = target.parentNode
      }
      this.selectedItem = target.dataset.index
    },
    showDeleteModal(e) {
      this.$refs.DeleteModal.isModalShow = true;
      var target = e.target
      while (!target.dataset.index) {
        if (target.dataset.index) {
          break
        }
        target = target.parentNode
      }
      this.selectedItem = target.dataset.index
    },
    getFolderContents() {
      axios.get(api.getDiaryContents + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            console.log(this.currentFolder)
            this.items = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteItem() {
      axios.delete(api.deleteDiary + this.items[this.selectedItem]._id)
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
    loadImg(e) {
      console.log(e.currentTarget.src)
      this.changeCurrentImg(e.currentTarget.src)
      this.$router.push('/img');
    }
  }
}
</script>
<style lang="less" scoped>
@import '../less/common.less';
#entries {
  background-image: url('../assets/52502973_p0.png');
  height: @commoncontainerheight;
  box-sizing: border-box;
  padding: 8px;
  overflow-x: scroll;
  .item {
    color: @maincolor;
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    height: 4.5rem;
    padding: 5px;
    margin-bottom: 8px;
    .dd {
      float: left;
      width: 3rem;
      text-align: center;
      .date {
        font-size: 2rem;
      }
      .day {
        font-size: .8em;
      }
    }
    .content {
      float: left;
      width: ~"calc(100% - 120px)";
      padding-left: 5px;
      .time {
        font-size: .7em;
      }
      .title,
      .article {
        overflow: hidden;
        text-overflow: ellipsis;
        height: 1.5rem;
      }
    }
    .state {
      float: right;
      font-weight: bold;
      .icon {
        font-size: 18px;
      }
    }
  }
  footer {
    .diaryfooter;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: Space-between;
    .buttons,
    .total {
      font-size: 1.5rem;
      padding: 0 10px;
    }
  }
  .modal {
    .modal-date {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-sizing: border-box;
      background-color: @maincolor;
      color: #fff;
      height: 30%;
      span {
        margin: 1px 0;
        font-size: .8rem;
      }
      .date {
        font-size: 4rem;
        line-height: 4rem;
      }
    }
    .modal-content {
      box-sizing: border-box;
      padding: 5px 10%;
      height: 60%;
      overflow-y: scroll;
      .title {
        font-size: 1.5rem;
        text-align: center;
      }
      .content {
        word-break: break-all;
        white-space: pre-wrap;
        color: #545454;
      }
      .img-wrapper {
        margin-top: 20px;
        width: 100%;
        img {
          height: 50px;
          width: 50px;
        }
      }
    }
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      height: 10%;
      background-color: @maincolor;
      i {
        font-size: 1.5rem;
        color: #fff;
        padding-left: 10px;
      }
    }
  }
}
</style>
