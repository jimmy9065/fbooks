import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Empty from '@/components/Index'
import main from '@/components/Main/index'
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
      component: main,
    },
    {
      path: '/main/history',
      name: 'History',
      component: history,
    },
    {
      path: '/main/analysis',
      name: 'Analysis',
      component: analysis,
    },
  ],
  mode: 'hash'
})
