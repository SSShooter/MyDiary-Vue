<template>
  <transition name="fade">
    <div v-show="isModalShow">
      <div class="mask" @click="update"></div>
      <div class="modal">
        <div class="mood">
          <label name="happy" for="happy">
            <i :class="{'checked': mood==='happy'}" class="iconfont icon-kaixin-"></i>
            <input id="happy" v-model="mood" type="radio" value="happy">
          </label>
          <label name="sad" for="sad">
            <i :class="{'checked': mood==='sad'}" class="iconfont icon-nanguo"></i>
            <input id="sad" v-model="mood" type="radio" value="sad">
          </label>
          <label name="address" for="normal">
            <i :class="{'checked':mood==='normal' }" class="iconfont icon-mianwubiaoqing"></i>
            <input id="normal" v-model="mood" type="radio" value="normal">
          </label>
          <label name="address" for="shock">
            <i :class="{'checked':mood==='shock' }" class="iconfont icon-zhenjing-"></i>
            <input id="shock" v-model="mood" type="radio" value="shock">
          </label>
        </div>
        <div class="weather">
          <label name="sunny" for="sunny">
            <i :class="{'checked': weather==='sunny'}" class="iconfont icon-qingtian"></i>
            <input id="sunny" v-model="weather" type="radio" value="sunny">
          </label>
          <label name="rainy" for="rainy">
            <i :class="{'checked': weather==='rainy'}" class="iconfont icon-baoyu"></i>
            <input id="rainy" v-model="weather" type="radio" value="rainy">
          </label>
          <label name="address" for="overcast">
            <i :class="{'checked':weather==='overcast' }" class="iconfont icon-duoyunzhuanyin"></i>
            <input id="overcast" v-model="weather" type="radio" value="overcast">
          </label>
          <label name="address" for="cloudy">
            <i :class="{'checked':weather==='cloudy' }" class="iconfont icon-duoyun"></i>
            <input id="cloudy" v-model="weather" type="radio" value="cloudy">
          </label>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isModalShow: false,
      weather: 'sunny',
      mood: 'happy'
    }
  },
  watch: {
    isModalShow(val) {
      if (!val) {
        this.contact = '';
        this.number = '';
        this.initial = '';
      }
    }
  },
  computed: mapGetters({
    currentFolder: 'getCurrentFolder'
  }),
  methods: {
    ...mapMutations([
      'changeMoodAndWeather'
    ]),
    update() {
      this.changeMoodAndWeather({ mood: this.mood, weather: this.weather })
      this.isModalShow = !this.isModalShow
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/common.less';
.mask {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: .3;
  height: 100vh;
  width: 100vw;
}

.modal {
  position: absolute;
  box-sizing: border-box;
  padding: 0 20px;
  top: 50%;
  left: 50%;
  margin-left: -140px;
  margin-top: -80px;
  width: 280px;
  height: 160px;
  background-color: #fff;
  color: @main-color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;

  label {
    .iconfont {
      padding-right: 10px;
      font-size: 2rem;
      font-weight: bold;
      opacity: .5;
    }
    input[type="radio"] {
      display: none;
    }
    .checked {
      opacity: 1;
    }
  }
  input,
  button {
    height: 30px;
    line-height: 30px;
    margin: 2px;
    border: 1px solid @main-color;
  }
  input {
    width: 180px;
    padding: 0 20px;
    color: @main-color;
  }
  button {
    width: 90px;
    background-color: @main-color;
    color: #fff;
  }
}
</style>