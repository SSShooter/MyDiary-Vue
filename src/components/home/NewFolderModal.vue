<template>
  <modal name="new-folder" :width="300" :height="200" @closed="newFolderName=''">
    <div class="pop-up-box clearfix">
      <span>文件夹类型</span>
      <div class="checkbox">
        <label :class="{'checked': newFolderType==='diary'}" name="diary" for="diary">
          <i class="iconfont icon-book"></i>日记本
          <input id="diary" v-model="newFolderType" type="radio" value="diary">
        </label>
        <label :class="{'checked': newFolderType==='todolist'}" name="todolist" for="todolist">
          <i class="iconfont icon-alert"></i>待办事项
          <input id="todolist" v-model="newFolderType" type="radio" value="todolist">
        </label>
        <label :class="{'checked':newFolderType==='contact' }" name="address" for="contact">
          <i class="iconfont icon-contact"></i>电话本
          <input id="contact" v-model="newFolderType" type="radio" value="contact">
        </label>
      </div>
      <span>文件夹名称</span>
      <input type="text" v-model="newFolderName" class="foldername">
      <button class="confirm" @click="newFolder">确定</button>
    </div>
  </modal>
</template>
<script>
import api from '../../api/api-config.js'
export default {
  data () {
    return {
      newFolderType: 'diary',
      newFolderName: ''
    }
  },
  methods: {
    newFolder () {
      if (!this.newFolderName) {
        alert('请输入文件夹名')
        return
      }
      if (this.newFolderName.length > 8) {
        alert('文件夹名称请不要超过8个字')
        return
      }
      this.$axios.post(api.newFolder, {
        type: this.newFolderType,
        foldername: this.newFolderName,
        createdate: +new Date()
      })
        .then(res => {
          if (res.data.code === 0) {
            this.$modal.hide('new-folder')
            this.$parent.getFolder()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/common.less';
.pop-up-box {
  color: @main-color;
  box-sizing: border-box;
  padding: 20px 10px;
  text-align: center;
  .checkbox {
    margin: 10px 0;
    display: flex;
    justify-content: Space-around;
    label {
      opacity: .5;
      .iconfont {
        padding-right: 10px;
      }
      input[type="radio"] {
        display: none;
      }
    }
    .checked {
      opacity: 1;
    }
  }
  .foldername {
    border: 1px @main-color solid;
    border-radius: 5px;
    color: @main-color;
    line-height: 1.5rem;
    padding: 0 10px;
    margin: 10px 0;
  }
  .confirm {
    border: 1px @main-color solid;
    margin: 10px 0;
    padding: 5px 15px;
    background-color: #fff;
    color: @main-color;
  }
}
</style>