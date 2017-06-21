<template>
  <div>
    <input @change="getimg"
           type="file" />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      file: ''
    }
  },
  watch: {
    file() {
      console.log(file);
    }
  },
  methods: {
    getimg(e) {
      console.log(e.target.files[0]);
      axios({
        url: 'http://120.76.217.199:8080/api/diary/picupload',
        method: 'post',
        data: {
          file: e.target.files[0]
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="less" scoped>

</style>