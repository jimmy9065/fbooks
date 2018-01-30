import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie';
import VueChart from 'vue-chart-js'

import 'vuetify/dist/vuetify.css'

import {store} from './store'
import { sync } from 'vuex-router-sync'

const unsync = sync(store, router)

Vue.use(Vuetify)
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VueChart)

console.log("start from here")

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

//unsync()
