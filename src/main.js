import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import 'vuetify/dist/vuetify.css'

import {store} from './store'
import { sync } from 'vuex-router-sync'

const unsync = sync(store, router)

Vue.use(Vuetify)

console.log("start from here")

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

//unsync()
