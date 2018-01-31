import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false,
    username : '',
    dataLoadState: false, // true for refreshing
    hDataLoadState: false, // true for refreshing
    backendServer: 'http://localhost',
    //backendServer: 'http://jimmy9065.ddns.net',
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
    updatingDT(state) {
      console.log('updating date state: ');
      state.dataLoadState = true;
    },
    updatedDT(state) {
      console.log('updated date state: ');
      state.dataLoadState = false;
    },
    updatingHDT(state) {
      console.log('update Hdate state: ');
      state.hDataLoadState = true;
    },
    updatedHDT(state) {
      console.log('update Hdate state: ');
      state.hDataLoadState = false;
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
        commit('updatingDT');
      },
      aFinishDT({commit}) {
        commit('updatedDT');
      },
      aUpdateHDT({commit}) {
        commit('updatingHDT');
      },
      aFinishHDT({commit}) {
        commit('updatedHDT');
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
      },
      isHLoaded(state) {
        return !state.hDataLoadState;
      },
    }
})
