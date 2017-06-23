const state = {
  uploadlist: [],
}

const mutations = {
  refreshUploadlist(state,newurl){
    state.uploadlist.push(newurl);
  },
  clearUploadlist(state){
    state.uploadlist = [];
  }
}
const getters = {
  getUploadlist(state){
    return state.uploadlist;
  }
}
export default {
  state,
  getters,
  mutations
}