import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie';
import VueChart from 'vue-chart-js'
import UUID from 'vue-uuid'

import 'vuetify/dist/vuetify.css'

import {store} from './store'

Vue.use(Vuetify)
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VueChart);
Vue.use(UUID);

console.log("start from here");

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
