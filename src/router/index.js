import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Empty from '@/components/Index'
import index from '@/components/Main/index'
import history from '@/components/Main/history'
import analysis from '@/components/Main/analysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Empty',
      component: Empty,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {path:'', component: index},
        {path:'analysis', component: analysis},
        {path:'history', component: history}
      ]
    }
  ],
  mode: 'hash'
})
