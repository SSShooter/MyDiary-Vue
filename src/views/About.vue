<template>
    <div>
        <header>
            <div class="left-btn">
                <i class="iconfont icon-prev" @click="$router.go(-1)"></i>
            </div>
            <span class="title">由来</span>
        </header>
        <div class="container">
            <vue-markdown :source="article"></vue-markdown>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  },
  data () {
    return {
      article: `## 简介
这个应用出自一部（曾经）很火的动画电影，这个电影的水平还是和人气成正比的    
看电影的时候注意到这个日记应用，忍不住立刻[仿了一个](https://github.com/ssshooter/MyDiary)，那时候用的是jquery             
之后，学Vue也有一段时间，浏览器端用得还算熟练，开始想更了解Vue的生态系统        
看完了各种资料后，觉得难懂的地方还是必须从实践中理解，于是再次想起了MyDiary     
其中不少不熟练的地方，请大家在issues提醒我     
这个项目前后端分离，后端使用nodejs和express实现RESTful API（[MyDiary API](https://github.com/ssshooter/MyDiary-API)）    
数据库选择了mongoDB，由于对数据库不太熟悉，数据库构建还是有所欠缺        
前端使用了vue全家桶，使用webpack进行打包    
## 技术栈    
vue2 / vuex / vue-router / webpack / ES6  / less     
## 主要功能
- 电话本，有搜索功能，有侧边栏的字母索引
- 代办事项，可以新添、删除事项，划线表示完成
- 笔记本功能，有搜索功能可
- 可翻页小日历
## todo
- [x] 登陆界面
- [x] 注册界面
- [x] 设定页面
- [x] 日记页面无限滚动翻页
- [ ] 日记修改功能
- [ ] 搜索功能
- [ ] 数据库结构优化
- [ ] 交换日记
- [x] 使用electron构建pc端
- [ ] 十分遥远的下一个目标，重构为PWA`
    }
  }
}
</script>
<style lang="less" scoped>
@import '../less/common.less';
header {
  .commonheader(@bgcolor: @main-color, @fontcolor: #fff);
}
.container {
  box-sizing: border-box;
  padding: 50/75rem;
  width: 100vw;
  height: @todolist-container-height;
}
</style>


