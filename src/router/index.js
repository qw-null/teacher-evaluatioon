import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/page/login'
import Index from '../components/page/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index
    }
  ]
})
