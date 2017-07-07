const HOST = 'http://120.76.217.199:8080/api'

const API = {
    // 用户登陆
  login: HOST + '/login',
    // 创建一个文件夹
  newFolder: HOST + '/folder',

    // 创建一条通讯录
  newContact: HOST + '/phonebook',

    // 创建一条代办事项
  newList: HOST + '/todolist',

    // 创建一篇日记
  newDiary: HOST + '/diary',

    // 获取所有文件夹
  getFolder: HOST + '/folder',

    // 获取对应文件夹内容
  getDiaryContents: HOST + '/folder/diary/',
  getContactContents: HOST + '/folder/phonebook/',
  getListContents: HOST + '/folder/todolist/',

    // 删除对应条目
  deleteDiary: HOST + '/diary/',
  deleteContact: HOST + '/phonebook/',
  deleteList: HOST + '/todolist/',

    // 删除文件夹
  deleteFolder: HOST + '/folder/',

    // 更改待办事项状态
  changeListItemState: HOST + '/todolist/',

    // 上传图片
  uploadImg: HOST + '/diary/picupload'
}

export default API
