# my-diary-vue   
<img src="src/assets/logoBlue.png" width = "30%"/>

### [English](README.En.md)       
## 简介
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
- [ ] 搜索功能
- [ ] 数据库结构优化
- [ ] 日记页面无限滚动翻页
- [ ] 交换日记
- [ ] 十分遥远的下一个目标，重构为PWA
## 界面截图    
截图使用fireshot      
![ss1](screenshot/1.png)
![ss2](screenshot/2.png)
![ss3](screenshot/3.png)
![ss4](screenshot/4.png)
![ss5](screenshot/5.png)
![ss6](screenshot/6.png)
![ss7](screenshot/7.png)
## 安装
其实在登陆系统没做好之前，这个项目完全可以用作自己的网络笔记本和代办事项，欢迎各位使用   
**请先确定安装好了node.js和mongoDB**   
**运行前请先安装[MyDiary API](https://github.com/ssshooter/MyDiary-API)**
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## PS
17.7.26 BD就要发售啦！到时候可以仔细研究下剧中的App了～
