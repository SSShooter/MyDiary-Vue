<template>
  <div>
    <div class="imgwrapper"
         v-for="pic in pics">
      <img :src="pic"
           @click="getlarge" />
    </div>
    <input @change="getimg"
           type="file"
           id="file" />
    <label for="file">+</label>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      file: '',
      pics: []
    }
  },
  watch: {
    file() {
      console.log(file);
    }
  },
  methods: {
    getimg(e) {
      var formData = new FormData();
      formData.append('file', e.target.files[0])
      axios({
        url: 'http://120.76.217.199:8080/api/diary/picupload',
        method: 'post',
        data: formData
      })
        .then(res => {
          console.log(res);
          this.pics.push(res.data.pic);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="less" scoped>
input {
  display: none;
}

label {
  display: block;
  height: 50px;
  width: 50px;
  border: 1px solid #000;
  text-align: center;
  line-height: 50px;
}

.imgwrapper {
  display: block;
  height: 50px;
  width: 50px;
  border: 1px solid #000;
  overflow: hidden;
}

img {
  height: 100%;
}

.large {
  position: absolute;
  width: 100vw;
}
</style>