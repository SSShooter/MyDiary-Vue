<template>
  <transition name="fadeinout">
    <div v-show="isModalShow">
      <div class="mask" @click="isModalShow=!isModalShow"></div>
      <div class="modal">
        <div class="wrapper" v-for="pic in uploadlist">
          <img :src="pic" @click="viewImg">
        </div>
        <input @change="getimg" type="file" id="file">
        <label class="wrapper" for="file">+</label>
      </div>
    </div>
  </transition>
</template>
<script>
import api from '../../api/api-config.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      file: '',
      uploaderWidth: 1,
      isModalShow: false
    }
  },
  watch: {
    uploadlist () {
      this.uploaderWidth = this.uploadlist.length + 1
    }
  },
  computed: mapGetters({
    uploadlist: 'getUploadlist',
    currentFolder: 'getCurrentFolder'
  }),
  methods: {
    ...mapMutations([
      'refreshUploadlist',
      'changeCurrentImg'
    ]),
    getimg (e) {
      var formData = new FormData()
      formData.append('file', e.target.files[0])
      e.target.value = ''
      this.$axios.post(api.uploadImg, formData)
        .then(res => {
          this.refreshUploadlist(res.data.pic)
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewImg (e) {
      console.log(e.currentTarget.src)
      this.changeCurrentImg(e.currentTarget.src)
      this.$router.push('/img')
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
  bottom: @common-footer-height;
  width: 100vw;
  height: 100px;
  background-color: #fff;
  color: @main-color;
  overflow-x: scroll;
  display: flex;
  align-items: center;
}

.wrapper {
  display: block;
  height: 80px;
  width: 80px;
  flex-shrink: 0;
  overflow: hidden;
  margin: 0 5px;
  img {
    width: 100%;
    height: 100%;
  }
}

input {
  display: none;
}

label {
  box-sizing: border-box;
  flex-shrink: 0;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  color: #ccc;
  border: #ccc solid 1px;
}
</style>