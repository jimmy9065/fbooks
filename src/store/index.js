import Vue from 'vue'
import Vuex from 'vuex'

import {router} from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false,
    routerUpdated: false
  },
  mutations: {
    updateLoginState(state) {
      state.loginState = true;
    },
    updateRouter(state) {
      state.routerUpdated = true;
    }
  },
  actions: {
      submitLogin({commit}, {username, password}){
        if(username == 'haha'){
          commit('updateLoginState');
          //router.push('/user')
          //state.router.path = '/user';
          //this.$router.push('/user');
          router.push('/user')
          commit('updateRouter');
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
