import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/BaseLayout'
import Index from '@/pages/Index'
import Login from '@/pages/login'
import News from '@/pages/News'
import File from '@/pages/File'
import UserInfo from '@/pages/UserInfo'
import ResetPassword from '@/pages/ResetPassword'
import AdminDepartment from '@/pages/AdminDepartment'
import AdminUser from '@/pages/AdminUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: BaseLayout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/news',
          name: 'news',
          component: News
        },
        {
          path: '/file/:fileType',
          name: 'file',
          component: File
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: UserInfo
        },
        {
          path: '/resetPassword',
          name: 'resetPassword',
          component: ResetPassword
        },
        {
          path: '/admin/department',
          name: 'adminDepartment',
          component: AdminDepartment
        },
        {
          path: '/admin/user',
          name: 'adminUser',
          component: AdminUser
        }
      ]
    }
  ]
})
