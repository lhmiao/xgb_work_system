import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/BaseLayout'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: BaseLayout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        }
      ]
    }
  ]
})
