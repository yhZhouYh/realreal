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
    checkAddress: JSON.parse(localStorage.getItem('checkAddress')) || {
      index: 0,
      item: null
    },
    currentOrder: {},
    currentLocation: {},
    servieTime: ''
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
    [types.CHECK_ADDRESS](state, { item, index }) {
      state.checkAddress.item = item
      state.checkAddress.index = index
      localStorage.setItem('checkAddress', JSON.stringify({ item, index }))
    },
    [types.SAVE_ORDER](state, order) {
      state.currentOrder = order
    },
    [types.LOGOUT](state) {
      state.user = {},
        state.accessToken = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    },
    [types.SAVE_LOCATION](state, location) {
      state.currentLocation = location
    },
    [types.SAVE_TIME](state, time) {
      state.servieTime = time
    }
  },
  actions: {
    saveAccssToken({ commit }, code) {
      commit(types.SAVE_ACCESSTOKEN, code)
    },
    login({ commit }, user) {
      commit(types.SAVE_USER, user)
    },
    changeLoading({ commit }) {
      commit(types.CHANGE_LOADING)
    },
    showFooter({ commit }) {
      commit(types.SHOW_FOOTER)
    },
    saveAddress({ commit }, address) {
      commit(types.ADDRESS_EDIT, address)
    },
    checkAddress({ commit }, { item, index }) {
      commit(types.CHECK_ADDRESS, { item, index })
    },
    saveOrder({ commit }, order) {
      commit(types.SAVE_ORDER, order)
    },
    logout({ commit }) {
      commit(types.LOGOUT)
    },
    saveLocation({ commit }, location) {
      commit(types.SAVE_LOCATION, location)
    },
    saveServiceTime({ commit }, time) {
      commit(types.SAVE_TIME, time)
    }

  },
  modules: {
    cart
  }
})