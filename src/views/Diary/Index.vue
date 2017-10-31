<template>
  <div id="diary">
    <header>
      <div class="btn-group">
        <button class="btn" :class="{active: menu==='entries'}" @click="loadEntries">Entries</button>
        <button class="btn" :class="{active: menu==='calendar'}" @click="loadCalendar">Calendar</button>
        <button class="btn" :class="{active: menu==='write'}" @click="loadWrite">Write</button>
      </div>
      <div class="bookname">{{currentFolderName}}</div>
    </header>
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      menu: 'entries'
    }
  },
  activated () {
    this.menu = this.$route.path.split('/')[2]
  },
  computed: mapGetters({
    currentFolderName: 'getCurrentFolderName'
  }),
  methods: {
    loadEntries () {
      this.$router.replace('/diary/entries')
      this.menu = 'entries'
    },
    loadCalendar () {
      this.$router.replace('/diary/calendar')
      this.menu = 'calendar'
    },
    loadWrite () {
      this.$router.replace('/diary/write')
      this.menu = 'write'
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/common.less';
header {
  .diaryheader;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px @main-color solid;
  .btn-group {
    display: inline-block;
  }
  .btn {
    margin: 0;
    outline: none;
    padding: 5px 20px;
    float: left;
    border: 1px @main-color solid;
    background-color: #fff;
    border-radius: 0;
    &:first-child {
      border-right: none;
      border-radius: 8px 0 0 8px;
    }
    &:last-child {
      border-left: none;
      border-radius: 0 8px 8px 0;
    }
    color: @main-color;
  }
  .active {
    background-color: @main-color;
    color: #fff;
  }
  .bookname {
    margin-top: 5px;
    color: @main-color;
  }
}
</style>