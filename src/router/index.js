import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: 'Fbooks: Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Fbooks: Login'
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        title: 'Fbooks: Login'
      },
      children: [
      ]
    }
  ],
  mode: 'history'
})
