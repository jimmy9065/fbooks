import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loginState: false,
    username : '',
    dataLoadState: false, // true for refreshing
    dueLoadState: false,
    hDataLoadState: false, // true for refreshing
    updateRecord: false,
    updatePayment: false,
    insertRecord: false,
    insertPayment: false,
    deleteRecord: false,
    deletePayment:false,
    //backendServer: 'http://localhost',
    backendServer: 'http://jimmy9065.ddns.net',
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
    updatingDue(state) {
      state.dueLoadState = true;
    },
    updatedDue(state) {
      state.dueLoadState = false;
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
    insertPayment(state) {
      state.insertPayment = true;
    },
    insertedPayment(state) {
      state.insertPayment = false;
    },
    updateRecord(state) {
      state.updateRecord = true;
    },
    updatedRecord(state) {
      state.updateRecord = false;
    },
    updatePayment(state) {
      state.updatePayment = true;
    },
    updatedPayment(state) {
      state.updatePayment = false;
    },
    deleteRecord(state) { 
      state.deleteRecord = true;
    },
    deletedRecord(state) { 
      state.deleteRecord = false;
    },
    deletePayment(state) { 
      state.delePaymentrd = true;
    },
    deletedPayment(state) { 
      state.deletePayment = false;
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
      aUpdatedDT({commit}) {
        commit('updatedDT');
      },
      aUpdateDue({commit}) {
        commit('updatingDue');
      },
      aUpdatedDue({commit}) {
        commit('updatedDue');
      },
      aUpdateHDT({commit}) {
        commit('updatingHDT');
      },
      aFinishHDT({commit}) {
        commit('updatedHDT');
      },
      aInsertRecord({commit}) {
        commit('insertRecord');
      },
      aInsertedRecord({commit}) {
        commit('insertedRecord');
      },
      aInsertPayment({commit}) {
        commit('insertPayment');
      },
      aInsertedPayment({commit}) {
        commit('insertedPayment');
      },
      aUpdateRecord({commit}) {
        commit('updateRecord');
      },
      aUpdatedRecord({commit}) {
        commit('updatedRecord');
      },
      aUpdatePayment({commit}) {
        commit('updatePayment');
      },
      aUpdatedPayment({commit}) {
        commit('updatedPayment');
      },
      aDeleteRecord({commit}) {
        commit('deleteRecord');
      },
      aDeletedRecord({commit}) {
        commit('deletedRecord');
      },
      aDeletePayment({commit}) {
        commit('deletePayment');
      },
      aDeletedPayment({commit}) {
        commit('deletedPayment');
      },
    },
    getters: {
      loadLoginState(state) {
        return state.loginState;
      },
      getUsername(state) {
        return state.username;
      },
      isLoaded(state) {
        return !(state.dataLoadState || state.dueLoadState)
      },
      isHLoaded(state) {
        return !state.hDataLoadState;
      },
      isChaningRecord(state){
        return state.updateRecord || state.deleteRecord || state.insertRecord;
      },
      isSumbmittingPayment(state){
        return state.insertPayment || state.updatePayment || state.deletePayment;
      },
    }
})
