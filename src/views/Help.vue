<template>
  <div>
    <header>
      <div class="left-btn">
        <i class="iconfont icon-prev" @click="$router.go(-1)"></i>
      </div>
      <span class="title">帮助</span>
    </header>
    <div class="container">
      <h1>主要功能</h1>
      <ul>
        <li>日记本</li>
        <li>待办事项</li>
        <li>电话本</li>
      </ul>
      <h1>主要操作</h1>
      <ul>
        <li>单击确定</li>
        <li>长按删除</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import '../less/common.less';
header {
  .commonheader(@bgcolor: @main-color, @fontcolor: #fff);
}
.container {
  box-sizing: border-box;
  padding: 5% 10%;
}
</style>


