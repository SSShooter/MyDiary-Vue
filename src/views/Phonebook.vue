<template>
  <div id="phonebook">
    <header>
      <span class="title">biaoti</span>
      <div class="right-btn">
        <i class="iconfont icon-pen"
           @click="showNewContactModal"></i>
      </div>
    </header>
    <div class="container">
      <index></index>
      <div class="item in items">
        <div class="name">zdj</div>
        <div class="number">3310333</div>
      </div>
      <div class="initial"
           id="a">
        aa
      </div>
    </div>
    <new-contact-modal ref="NewContactModal"></new-contact-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import Index from '../components/contact/Index.vue'
import NewContactModal from '../components/contact/NewContactModal.vue'
export default {
  data() {
    return {
      contact: '',
      initial: '',
      number: '',
      items: []
    }
  },
  components: {
    Index,
    NewContactModal
  },
  mounted() {
    this.getFolderContents()
  },
  methods: {
    showNewContactModal() {
      this.$refs.NewContactModal.isModalShow = true;
    },
    getFolderContents() {
      axios.get('http://120.76.217.199:8080/api/folder/phonebook/' + this.currentFolder)
        .then(res => {
          if (res.data.code === 0) {
            this.items = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_cy3k4msf00y66r.css';
@import '../less/common.less';
header {
  .commonheader(@bgcolor: #fff, @fontcolor: @maincolor);
}

.container {
  display: flex;
  justify-content: baseline;
  align-items: center;
  flex-direction: column;
  height: @contactcontainerheight;
  background-color: @maincolor;
  box-sizing: border-box;
  overflow: scroll;
  .item {
    padding: 10px 50px;
    background-color: #fff;
    color: @maincolor;
    border-radius: 5px;
    margin: 5px 0;
  }
  .initial {
    font-size: 2rem;
    color: #fff;
    font-weight: bold;
  }
}
</style>