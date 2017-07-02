const HOST = "http://120.76.217.199:8080/api"

const API = {
    newContact: HOST + '/phonebook',
    newFolder: HOST + '/folder',
    newList: HOST + '/todolist',
    newDiary: HOST + '/diary',
    getFolder: HOST + '/folder',
    getDiaryContents: HOST + '/folder/diary/',
    getContactContents: HOST + '/folder/phonebook/',
    getListContents: HOST + '/folder/todolist/',
    deleteDiary: HOST + '/diary/',
    deleteContact: HOST + '/phonebook/',
    deleteList: HOST + '/todolist/',
    changeListItemState: HOST + '/todolist/',
    uploadImg: HOST + '/diary/picupload'
}

export default API