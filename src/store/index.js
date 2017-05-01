import Vue from 'vue'
import Vuex from 'vuex'
import cart from './moduel/cart'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMenu: [],
    accessToken: localStorage.getItem('accessToken') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    loading: false,
    showFooter: true,
    addressEdit: '',
    checkAddress: {
      index: 0,
      item: null
    }
  },
  // actions,
  // getters,
  mutations: {
    [types.SAVE_ACCESSTOKEN](state, code) {
      localStorage.setItem('accessToken', code)
      state.accessToken = code
    },
    [types.SAVE_USER](state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    [types.CHANGE_LOADING](state) {
      state.loading = !state.loading
    },
    [types.SHOW_FOOTER](state) {
      state.showFooter = !state.showFooter
    },
     [types.ADDRESS_EDIT](state, address) {
      state.addressEdit = address
     },
     [types.CHECK_ADDRESS](state, {item, index}) {
        state.checkAddress.item = item
        state.checkAddress.index = index
     }
  },
  actions: {
    saveAccssToken({commit}, code){
      commit(types.SAVE_ACCESSTOKEN, code)
    },
    login({commit}, user){
      commit(types.SAVE_USER, user)
    },
    changeLoading({commit}){
      commit(types.CHANGE_LOADING)
    },
    showFooter({commit}){
       commit(types.SHOW_FOOTER)
    },
    saveAddress({commit},address){
      commit(types.ADDRESS_EDIT, address)
    },
    checkAddress({commit},{item, index}){
      commit(types.CHECK_ADDRESS, {item, index})
    } 
  },
  modules: {
    cart
  }
})