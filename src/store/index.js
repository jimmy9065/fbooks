import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false
  },
  mutations: {
  },
  actions: {
      submitLogin(state, username, password){
        if(username == 'haha')
          state.loginState = true;
      }
  },
  getters: {
    loadLoginState(state) {
      return state.loginState;
    }
  }
})
