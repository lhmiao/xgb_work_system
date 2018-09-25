import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 为防止用户在需要登录的页面刷新导致被弹回login界面，所以设为true，会在BaseLayout组件created时logout，然后进行checkLogin
    isLoggedIn: true,
    userInfo: {
      userId: '',
      userName: '',
      trueName: '',
      department: '',
      authority: ''
    }
  },
  mutations: {
    login (state) {
      state.isLoggedIn = true
    },
    logout (state) {
      state.isLoggedIn = false
      let keys = Object.keys(state.userInfo)
      for (let key of keys) {
        state.userInfo[key] = ''
      }
    },
    initUserInfo (state, data) {
      state.userInfo.userId = data.id
      state.userInfo.userName = data.name
      state.userInfo.trueName = data.true_name
      state.userInfo.department = data.apart
      state.userInfo.authority = data.authority
    }
  }
})

export default store
