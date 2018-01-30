import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false,
    username : '',
    dataLoadState: false, // true for refreshing
  },
  mutations: {
    updateLoginState(state, isLogin) {
      state.loginState = isLogin;
    },
    updateRouter(state) {
      state.routerUpdated = true;
    },
    updateUsername(state, username) {
      state.username = username;
    },
    updateRefreshState(state, isRefreshing) {
      state.dataLoadState = isRefreshing;
    },
  },
  actions: {
      submitLogin({commit}, {pass, username}){
        console.log('if pass is right:' + pass)
        return new Promise((resolve, reject) => {
          if(pass){
            commit('updateLoginState', true);
            commit('updateUsername', username);
            resolve();
          }
          else
            reject();
        });
      },
      submitLogout({commit}) {
        return new Promise((resolve, reject) => {
          console.log('submit logout')
          commit('updateLoginState', false);
          commit('updateUsername', '');
          resolve();
        })
      },
      aUpdateDT({commit}) {
        commit('updateRefreshState', true);
      },
      aFinishDT({commit}) {
        commit('updateRefreshState', false);
      },
    },
    getters: {
      loadLoginState(state) {
        console.log("updated login state");
        return state.loginState;
      },
      getUsername(state) {
        console.log("updated username");
        return state.username;
      },
      isLoaded(state) {
        console.log("query load progress");
        return !state.dataLoadState;
      }
    }
})
