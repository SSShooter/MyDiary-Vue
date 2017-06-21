<template>
  <div>
    <input @change="getimg" type="file" id="file"/>
    <label for="file">Choose a file</label>
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
      var formData = new FormData();
      formData.append('file',e.target.files[0])
      axios({
        url: 'http://120.76.217.199:8080/api/diary/picupload',
        method: 'post',
        data:formData
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
input{
  display: none;
}
</style>