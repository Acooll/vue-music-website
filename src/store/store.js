import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  testMsg: '111',
}

const mutations = {
  changeTestMsg(state, str){
    state.testMsg = str;
  },


}

const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;

