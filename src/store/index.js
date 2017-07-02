import Vue from 'vue'
import Vuex from 'vuex'
import diary from './modules/diary'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    diary
  },
  state: {
    currentFolder: '',
    currentFolderName: '',
    currentImg: ''
  },
  getters: {
    getCurrentFolder(state) {
      return state.currentFolder;
    },
    getCurrentFolderName(state) {
      return state.currentFolderName;
    },
    getCurrentImg(state) {
      return state.currentImg;
    }
  },
  mutations: {
    changeCurrentFolder(state, newCurrentFolder) {
      state.currentFolder = newCurrentFolder
    },
    changeCurrentFolderName(state, newCurrentFolderName) {
      state.currentFolderName = newCurrentFolderName
    },
    changeCurrentImg(state, newCurrentImg) {
      state.currentImg = newCurrentImg
    }
  }
})