import Vue from 'vue'
import Vuex from 'vuex'
import diary from './modules/diary'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    diary
  },
  state: {
    currentFolder: '594895ca3e16a13016739408',
    currentFolderName: '电话本'
  },
  getters: {
    getCurrentFolder(state) {
      return state.currentFolder;
    },
    getCurrentFolderName(state) {
      return state.currentFolderName;
    }
  },
  mutations: {
    changeCurrentFolder(state, newCurrentFolder) {
      state.currentFolder = newCurrentFolder
    },
    changeCurrentFolderName(state, newCurrentFolderName) {
      state.currentFolderName = newCurrentFolderName
    }
  }
})