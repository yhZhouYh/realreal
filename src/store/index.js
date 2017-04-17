import Vue from 'vue'
import Vuex from 'vuex'
import cart from './moduel/cart'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMenu: [],
    accessToken: localStorage.getItem('accessToken') || '',
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  // actions,
  // getters,
  mutations: {
    [types.SAVE_ACCESSTOKEN](state, code) {
      localStorage.setItem('accessToken', code)
      state.accessToken = code
    },
    [types.SAVE_USER](state, user) {
      localStorage.setItem('user', user)
      state.user = user
    }

  },
  actions: {
    saveAccssToken({commit}, code){
      commit(types.SAVE_ACCESSTOKEN, code)
    },
    login({commit}, user){
      commit(types.SAVE_USER, user)
    }
    
  },
  modules: {
    cart
  }
})