<template>
  <div id="entries">
  
    <div class="items">
      <div v-for="(item,index) in items" v-finger:long-tap="showDeleteModal" @click="showDiaryContentModal($event)" :key="item._id" :data-index="index" class="item">
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
      <p v-show="isBottom" class="bottom">- 到底了 -</p>
      <infinite-loading v-show="!isBottom" :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
    </div>
  
    <footer>
      <div class="buttons">
        <i class="iconfont icon-shouye" @click="backHome"></i>
      </div>
      <div class="total">{{currentCount}} Entries</div>
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
          <img v-for="pic in items[selectedItem].pic" :src="pic" @click="viewImg">
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
import api from '../api/api-config.js'
import { mapGetters, mapMutations } from 'vuex'
import DiaryContentModal from '~/diary/DiaryContentModal'
import DeleteModal from '~/DeleteModal'
import InfiniteLoading from 'vue-infinite-loading'
var moment = require('moment')

export default {
  data () {
    return {
      selectedItem: '',
      items: [],
      example: {
        '_id': '594785c8887da62d86d8235b',
        'folderId': '594782856659ac2d39589508',
        'title': '第二篇日记2',
        'content': 'something happend',
        'mood': 'kaixin-',
        'weather': 'baoxue',
        'createdate': '2017-06-18',
        '__v': 0,
        'pic': []
      },
      page: 0,
      isBottom: false
    }
  },
  components: {
    InfiniteLoading,
    DiaryContentModal,
    DeleteModal
  },
  // 钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
  activated () {
    this.page = 0
    this.getFolderContents()
    this.isBottom = false
    console.log(this.currentCount)
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder',
    currentCount: 'getCurrentCount'
  }),
  methods: {
    ...mapMutations(
      ['changeCurrentImg']
    ),
    backHome () {
      this.$router.replace('/home')
    },
    convertToMMMM (timestamp) {
      return moment(timestamp).format('MMMM')
    },
    convertToDD (timestamp) {
      return moment(timestamp).format('DD')
    },
    convertToD (timestamp) {
      return moment(timestamp).format('D')
    },
    convertToddd (timestamp) {
      return moment(timestamp).format('ddd')
    },
    convertToHHmm (timestamp) {
      return moment(timestamp).format('HH:mm')
    },
    convertToYYYY (timestamp) {
      return moment(timestamp).format('YYYY')
    },
    convertTodddd (timestamp) {
      return moment(timestamp).format('dddd')
    },
    showDiaryContentModal (e) {
      this.$refs.DiaryContentModal.isModalShow = true
      this.selectedItem = e.currentTarget.dataset.index
    },
    showDeleteModal (e) {
      this.$refs.DeleteModal.isModalShow = true
      var target = e.target
      while (!target.dataset.index) {
        if (target.dataset.index) {
          break
        }
        target = target.parentNode
      }
      this.selectedItem = target.dataset.index
    },
    getFolderContents () {
      console.log(api.getDiaryContents + this.currentFolder + '/' + this.page)
      this.$axios.get(api.getDiaryContents + this.currentFolder + '/' + this.page)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
            this.page += 1
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteItem () {
      this.$axios.delete(api.deleteDiary + this.items[this.selectedItem]._id)
        .then(res => {
          if (res.data.code === 0) {
            this.page = 0
            this.getFolderContents()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    viewImg (e) {
      console.log(e.currentTarget.src)
      this.changeCurrentImg(e.currentTarget.src)
      this.$router.push('/img')
    },
    onInfinite () {
      this.$axios.get(api.getDiaryContents + this.currentFolder + '/' + this.page)
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data.length === 0) {
              this.isBottom = true
              return
            }
            this.items = this.items.concat(res.data.data)
            this.page += 1
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
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
#entries {
  background-image: url('../assets/52502973_p0.png');
  height: @entries-container-height;
  box-sizing: border-box;
  padding: 8px;
  overflow-x: scroll;
  .item {
    color: @main-color;
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
  .bottom {
    text-align: center;
    color: @main-color;
  }
  footer {
    .diaryfooter;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: Space-between;
    .total,
    i {
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
      background-color: @main-color;
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
          width: 100%;
        }
      }
    }
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      height: 10%;
      background-color: @main-color;
      i {
        font-size: 1.5rem;
        color: #fff;
        padding-left: 10px;
      }
    }
  }
}
</style>
