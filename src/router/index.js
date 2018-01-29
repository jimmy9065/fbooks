import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
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
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        title: 'Fbooks: Login'
      }
      children: [
        {
          path:''
        }
      ]
    }
  ],
  mode: 'history'
})
