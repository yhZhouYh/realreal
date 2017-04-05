import Vue from 'vue'
import Vuex from 'vuex'
import cart from './moduel/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMenu: []
  },
  // actions,
  // getters,
  mutations: {
    // CURRENT_MENU(state, menu) {
    //   state.currentMenu = menu
    // }

  },
  actions: {
    // logout({ commit }) {
    //   commit(USER_LOGOUT)
    // },
    
  },
  modules: {
    cart
  }
//   modules: {
//     user,
//     flow,
//     system,
//     home
//   }
})