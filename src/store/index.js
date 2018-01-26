import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false
  },
  mutations: {
    updateLoginState(state) {
      state.loginState = true;
      this.$router.go('/user')
      //state.route.path = '/user';
    }
  },
  actions: {
      submitLogin({commit}, {username, password}){
        if(username == 'haha'){
          commit('updateLoginState');
          console.log("updated the loginState");
        }
      }
  },
  getters: {
    loadLoginState(state) {
      console.log("update in getters");
      return state.loginState;
    }
  }
})
