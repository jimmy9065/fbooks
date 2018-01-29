import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false,
    username : ''
  },
  mutations: {
    updateLoginState(state) {
      state.loginState = true;
    },
    updateRouter(state) {
      state.routerUpdated = true;
    },
    updateUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
      submitLogin({commit}, {pass, username}){
        console.log('if pass is right:' + pass)
        return new Promise((resolve, reject) => {
          if(pass){
            commit('updateLoginState');
            commit('updateUsername', username);
            resolve();
          }
          else
            reject();
        });
      }
  },
  getters: {
    loadLoginState(state) {
      console.log("updated login state");
      return state.loginState;
    },
    getUsername(state) {
      console.log("updated username");
      return state.username;
    }
  }
})
