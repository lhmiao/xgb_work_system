import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/BaseLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: BaseLayout
    }
  ]
})
