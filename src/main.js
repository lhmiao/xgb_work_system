// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// element-ui按需引入，配置引入组件见./elementUIConfig/index.js
import './elementUIConfig'
// element-ui完整引入
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex'

Vue.config.productionTip = false
// Vue.use(ElementUI)

// 无需登录即可前往的页面的路径
const unrequireLoginPath = ['/login', '/loading']
router.beforeEach((to, from, next) => {
  if (unrequireLoginPath.includes(to.path)) {
    next()
  } else {
    if (store.state.isLoggedIn) {
      next()
    } else {
      router.app.$message('请先登录')
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
