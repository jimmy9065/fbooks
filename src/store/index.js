import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loginState: false,
    username : '',
    dataLoadState: false, // true for refreshing
    hDataLoadState: false, // true for refreshing
    updateRecord: false,
    insertRecord: false,
    deleteRecord: false,
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
      state.dataLoadState = true;
    },
    updatedDT(state) {
      state.dataLoadState = false;
    },
    updatingHDT(state) {
      state.hDataLoadState = true;
    },
    updatedHDT(state) {
      state.hDataLoadState = false;
    },
    insertRecord(state) {
      state.insertRecord = true;
    },
    insertedRecord(state) {
      state.insertRecord = false;
    },
    updateRecord(state) {
      state.updateRecord = true;
    },
    updatedRecord(state) {
      state.updateRecord = false;
    },
    deleteRecord(state) { 
      state.deleteRecord = true;
    },
    deletedRecord(state) { 
      state.deleteRecord = false;
    },
  },
  actions: {
      submitLogin({commit}, {pass, username}){
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
      aInsertRecord({commit}) {
        commit('InsertRecord');
      },
      aInsertRecord({commit}) {
        commit('insertedRecord');
      },
      aUpdateRecord({commit}) {
        commit('updateRecord');
      },
      aUpdatedRecord({commit}) {
        commit('updatedRecord');
      },
      aDeleteRecord({commit}) {
        commit('deleteRecord');
      },
      aDeletedRecord({commit}) {
        commit('deletedRecord');
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
      isChaningRecord(state){
        return state.updateRecord || state.deleteRecord || state.insertRecord;
      },
    }
})
