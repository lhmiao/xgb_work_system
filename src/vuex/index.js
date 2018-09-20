import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
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
