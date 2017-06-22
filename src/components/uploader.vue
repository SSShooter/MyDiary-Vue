<template>
  <div class="uploader">
    <div class="imgwrapper" v-for="pic in pics">
      <img :src="pic" />
    </div>
    <input @change="getimg" type="file" id="file" />
    <label for="file">+</label>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      file: '',
      pics: ["http://www.time-record.net:8080/1498102597917NMzb.jpg","http://www.time-record.net:8080/1498102597917NMzb.jpg","http://www.time-record.net:8080/1498131919564CCJ2.jpg","http://www.time-record.net:8080/1498102597917NMzb.jpg","http://www.time-record.net:8080/1498131919564CCJ2.jpg"]
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
.uploader {
  display: flex;
  width: 100%;
  overflow-x: scroll;
  .imgwrapper {
    display: block;
    height: 80px;
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
  height: 80px;
  width: 80px;
  text-align: center;
  line-height: 50px;
}
</style>