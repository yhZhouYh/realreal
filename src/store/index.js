import Vue from 'vue'
import Vuex from 'vuex'
import cart from './moduel/cart'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMenu: [],
    accessToken: localStorage.getItem('accessToken') || ''
  },
  // actions,
  // getters,
  mutations: {
    [types.SAVE_ACCSSSTOKEN](state, code) {
      localStorage.setItem('accessToken', code)
      state.accessToken = code
    }

  },
  actions: {
    saveAccssToken({commit}, code){
      commit(types.SAVE_ACCSSSTOKEN, code)
    }
    
  },
  modules: {
    cart
  }
})