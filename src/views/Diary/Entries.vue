<template>
  <div>
    <div id="entries">
      <div v-if="items.length!==0" class="items">
        <diary-item v-for="(item,index) in items" v-finger:long-tap="showDeleteModal" @click.native="showDiaryContentModal(item)" :key="item._id" :data-index="index" :item="item"></diary-item>
        <p v-show="isBottom" class="bottom">- 到底了 -</p>
        <infinite-loading v-show="!isBottom" :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
      </div>
    </div>
    <footer>
      <div class="buttons">
        <i class="iconfont icon-shouye" @click="backHome"></i>
      </div>
      <div class="total">{{currentCount}} Entries</div>
    </footer>
    <diary-content-modal ref="DiaryContentModal" :item="selectedItem"></diary-content-modal>
    <delete-modal ref="DeleteModal"></delete-modal>
  </div>
</template>
<script>
import api from '@/api/api-config.js'
import { mapGetters, mapMutations } from 'vuex'
import DiaryContentModal from '~/diary/DiaryContentModal'
import DiaryItem from '~/diary/DiaryItem'
import DeleteModal from '~/DeleteModal'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  data () {
    return {
      selectedItem: '',
      items: [],
      example: {
        _id: '594785c8887da62d86d8235b',
        folderId: '594782856659ac2d39589508',
        title: '第二篇日记2',
        content: 'something happend',
        mood: 'kaixin-',
        weather: 'baoxue',
        createdate: '2017-06-18',
        __v: 0,
        pic: []
      },
      page: 0,
      isBottom: false
    }
  },
  components: {
    InfiniteLoading,
    DiaryContentModal,
    DiaryItem,
    DeleteModal
  },
  // 钩子的触发顺序created-> mounted-> activated，
  // 退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
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
    ...mapMutations(['changeCurrentImg']),
    backHome () {
      this.$router.replace('/home')
    },
    showDiaryContentModal (item) {
      // 可以试试prop.sync
      this.$refs.DiaryContentModal.isModalShow = true
      this.selectedItem = item
      // 阻止底层滑动
      this.$nextTick(() => {
        document
          .querySelector('.modal-content')
          .addEventListener('touchstart', e => {
            if (e.target === e.currentTarget) return
            e.preventDefault()
          })
      })
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
      this.$axios
        .get(api.getDiaryContents + this.currentFolder + '/' + this.page)
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
      this.$axios
        .delete(api.deleteDiary + this.items[this.selectedItem]._id)
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
      this.$axios
        .get(api.getDiaryContents + this.currentFolder + '/' + this.page)
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
@import '~@/less/common.less';
#entries {
  background-image: url('~@/assets/52502973_p0.png');
  position: absolute;
  top: @diary-header-height;
  bottom: @common-footer-height;
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  overflow-x: scroll;
  .items {
    .bottom {
      text-align: center;
      color: @main-color;
    }
  }
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
</style>
