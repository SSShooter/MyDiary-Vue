<template>
  <div class="wrap-all" @click="test">
    <div class="uploader">
      <div class="imgwrapper" v-for="pic in uploadlist">
        <img :src="pic">
      </div>
      <input @change="getimg" type="file" id="file">
      <label for="file">+</label>
    </div>
  </div>
</template>
<script>
import api from '../../api/api-config.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      file: '',
      uploaderWidth: 1
    }
  },
  watch: {
    uploadlist() {
      this.uploaderWidth = this.uploadlist.length + 1;
    }
  },
  computed: mapGetters({
    uploadlist: 'getUploadlist',
    currentFolder: 'getCurrentFolder'
  }),
  methods: {
    ...mapMutations([
      'refreshUploadlist'
    ]),
    test() {
    },
    getimg(e) {
      var formData = new FormData();
      formData.append('file', e.target.files[0])
      e.target.value = ''
      this.$axios.post(api.uploadImg, formData)
        .then(res => {
          if (res.data.code === 11) {
            alert('登录失效')
            this.$router.push('/login')
          }
          this.refreshUploadlist(res.data.pic)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="less" scoped>
.wrap-all {
  width: 100%;
  overflow-x: scroll;
}

.uploader {
  display: flex;
  overflow-x: scroll;
  .imgwrapper {
    display: block;
    height: 80px;
    width: 80px;
    flex-shrink: 0;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
}

input {
  display: none;
}

label {
  display: block;
  box-sizing: border-box;
  height: 80px;
  width: 80px;
  flex-shrink: 0;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  color: #ccc;
  border: #ccc solid 1px;
}
</style>