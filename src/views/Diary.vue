<template>
  <div id="diary">
    <header>
      <div class="btn-group">
        <button class="btn"
                :class="{active: menu==='entries'}"
                @click="loadEntries">Entries</button>
        <button class="btn"
                :class="{active: menu==='calendar'}"
                @click="loadCalendar">Calendar</button>
        <button class="btn"
                :class="{active: menu==='write'}"
                @click="loadWrite">Write</button>
      </div>
      <div class="bookname">nikki</div>
    </header>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      menu: 'entries'
    }
  },
  mounted() {
    this.menu = this.$route.path.split('/')[2];
  },
  methods: {
    loadEntries() {
      this.$router.replace('/diary/entries');//疑问
      this.menu = 'entries';
    },
    loadCalendar() {
      this.$router.replace('/diary/calendar');
      this.menu = 'calendar';
    },
    loadWrite() {
      this.$router.replace('/diary/write');
      this.menu = 'write';
    }
  }
}
</script>
<style lang="less" scoped>
@import '../less/common.less';
header {
  .diaryheader;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px @maincolor solid;
  .btn-group {
    display: inline-block;
  }
  .btn {
    margin: 0;
    outline: none;
    padding: 5px 20px;
    float: left;
    border: 1px @maincolor solid;
    background-color: #fff;
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    color: @maincolor;
  }
  .active {
    background-color: @maincolor;
    color: #fff;
  }
  .bookname {
    margin-top: 5px;
    color: @maincolor;
  }
}
</style>