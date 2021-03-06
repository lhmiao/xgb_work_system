import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/BaseLayout'
import Loading from '@/pages/Loading'
import Index from '@/pages/Index'
import Login from '@/pages/login'
import Notification from '@/pages/Notification'
import NotificationDetail from '@/pages/NotificationDetail'
import File from '@/pages/File'
import UserInfo from '@/pages/UserInfo'
import ResetPassword from '@/pages/ResetPassword'
import AdminDepartment from '@/pages/AdminDepartment'
import AdminUser from '@/pages/AdminUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: BaseLayout,
      redirect: '/loading',
      children: [
        {
          path: '/loading',
          name: 'loading',
          component: Loading
        },
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
          path: '/notification',
          name: 'Notification',
          component: Notification
        },
        {
          path: '/notification/:id',
          name: 'notificationDetail',
          component: NotificationDetail
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
