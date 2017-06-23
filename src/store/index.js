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
    currentFolderName: '电话本',
    currentItem: 'test',
  },
  getters: {
    getCurrentFolder(state) {
      return state.currentFolder;
    }
  },
  mutations: {
    changeCurrentFolder(state, currentFolder) {
      state.currentFolder = currentFolder
    }
  }
})