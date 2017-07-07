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
    currentCount:'',
    currentImg: ''
  },
  getters: {
    getCurrentFolder (state) {
      return state.currentFolder
    },
    getCurrentFolderName (state) {
      return state.currentFolderName
    },
    getCurrentCount (state) {
      return state.CurrentCount
    },
    getCurrentImg (state) {
      return state.currentImg
    }
  },
  mutations: {
    changeCurrentFolder (state, newCurrentFolder) {
      state.currentFolder = newCurrentFolder
    },
    changeCurrentFolderName (state, newCurrentFolderName) {
      state.currentFolderName = newCurrentFolderName
    },
    changeCurrentCount (state, newCurrentCount) {
      state.CurrentCount = newCurrentCount
    },
    changeCurrentImg (state, newCurrentImg) {
      state.currentImg = newCurrentImg
    }
  }
})
