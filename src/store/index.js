import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentFolder: 'test',
    currentItem: 'test',
    currentType: 'diary'
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