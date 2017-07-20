<template>
  <div id="write">
    <div class="calendar">
      <div class="month">{{month}}</div>
      <div class="date">{{date}}</div>
      <div class="day">{{day}} {{time}}</div>
      <div @click="showMoodAndWeather">
        {{mood}} {{weather}}
      </div>
    </div>
    <div class="write">
      <input v-model.trim="title" placeholder="title">
      <textarea v-model.trim="content" placeholder="content"></textarea>
    </div>
    <footer>
      <i class="iconfont icon-zhaopian" @click="showUploadModal"></i>
      <i class="iconfont icon-baocun" @click="newDiary"></i>
      <i class="iconfont icon-guanbi" @click="clear"></i>
    </footer>
  
    <uploader ref="Uploader"></uploader>
  
    <mood-and-weather ref="MoodAndWeather"></mood-and-weather>
  </div>
</template>

<script>
import api from '../api/api-config.js'
var moment = require('moment')
import { mapGetters, mapMutations } from 'vuex'
import Uploader from '../components/diary/Uploader.vue'
import MoodAndWeather from '../components/diary/MoodAndWeather.vue'
var word2icon = {
  sad: 'nanguo',
  happy: 'kaixin-',
  normal: 'mianwubiaoqing',
  shock: 'zhenjing-',
  sunny: 'qingtian',
  cloudy: 'duoyun',
  rainy: 'baoyu',
  overcast: 'duoyunzhuanyin'
}
export default {
  data () {
    return {
      moment: '',
      month: '',
      date: '',
      day: '',
      time: '',
      title: '',
      content: '',
      bookmark: '',
      tag: ''
    }
  },
  components: {
    Uploader,
    MoodAndWeather
  },
  mounted () {
    this.moment = moment()
  },
  computed: mapGetters({
    uploadlist: 'getUploadlist',
    currentFolder: 'getCurrentFolder',
    mood: 'mood',
    weather: 'weather'
  }),
  methods: {
    ...mapMutations([
      'clearUploadlist',
      'changeMoodAndWeather',
      'changeCurrentCount'
    ]),
    showUploadModal () {
      this.$refs.Uploader.isModalShow = true
    },
    showMoodAndWeather () {
      this.$refs.MoodAndWeather.isModalShow = true
    },
    newDiary () {
      if (!this.title || !this.content) {
        alert('请填写标题和日记内容')
        return
      }
      let data = {
        folderId: this.currentFolder,
        title: this.title,
        content: this.content,
        pic: this.uploadlist,
        mood: word2icon[this.mood],
        weather: word2icon[this.weather],
        bookmark: this.bookmark,
        tag: this.tag,
        createdate: +new Date()
      }
      this.$axios.post(api.newDiary, data)
        .then(res => {
          if (res.data.code === 0) {
            this.title = ''
            this.content = ''
            this.bookmark = ''
            this.tag = ''
            this.clearUploadlist()
            this.changeMoodAndWeather({ mood: '心情', weather: '天气' })
            this.$router.replace('/diary/entries')
            this.$parent.menu = 'entries'
            this.changeCurrentCount('plus1')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clear () {
      var a = confirm('是否清空页面？')
      if (a) {
        this.title = ''
        this.content = ''
        this.bookmark = ''
        this.tag = ''
        this.clearUploadlist()
      }
    }
  },
  watch: {
    moment () {
      this.month = this.moment.format('MMM')
      this.date = this.moment.format('DD')
      this.day = this.moment.format('dddd')
      this.time = this.moment.format('hh:mm')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../less/common.less';
* {
  box-sizing: border-box;
}

.calendar {
  height: 180px;
  background-color: @main-color;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  .date {
    font-size: 4rem;
  }
}

.write {
  padding: 10px;
  input {
    display: block;
    border: none;
    width: 100%;
    line-height: 3rem;
    font-size: 1.5rem;
    padding-left: 10px;
    border-bottom: @main-color 1px solid;
  }
  textarea {
    resize: none;
    width: 100%;
    height: 180px;
    margin-top: 10px;
    padding: 10px;
    border: none;
    font-size: 1.2rem;
  }
}

footer {
  .diaryfooter;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: 1.5rem;
    padding: 0 20px;
  }
}
</style>