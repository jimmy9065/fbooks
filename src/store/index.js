import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false
  },
  mutations: {
    setLoginState(state){
      state.loginState = true;
    }
  },
  actions: {
      submitLogin(commit, {username, password}){
        if(username == 'haha')
          store.commit('setLoginState');
      }
  },
  getters: {
    loadLoginState(state) {
      return state.loginState;
    }
  }
})
