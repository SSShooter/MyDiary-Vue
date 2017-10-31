<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to.path, from.path)
    if (to.path === '/home') this.transitionName = 'slide-left'
    else this.transitionName = 'slide-right'
    next()
  },
  watch: {
    $route (to, from) {
      if (to.path === '/home') this.transitionName = 'slide-left'
      else this.transitionName = 'slide-right'
    }
  }
}
</script>

<style lang="less">
.item {
  &:active {
    background-color: #fbfbfb;
  }
}
.child-view {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
