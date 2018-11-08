<template>
  <div class="baseLayout">
    <my-header></my-header>
    <el-container>
      <el-aside width="220px" v-if="isLoggedIn">
        <my-aside></my-aside>
      </el-aside>
      <el-main>
        <keep-alive exclude="login,notificationDetail,resetPassword,file">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from './MyHeader'
import myFooter from './MyFooter'
import myAside from './MyAside'
import User from '@/apis/User'

const user = new User()

export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    this.$store.commit('logout')
    let toPath = this.$route.path
    user.checkLogin()
      .then(res => {
        this.$store.commit('login')
        this.$store.commit('initUserInfo', res)
        // 如果toPath为'/loading'说明是初次打开页面，则让用户前往'/index'
        if (toPath === '/loading') {
          this.$router.replace('/index')
        } else {
          this.$router.replace(toPath)
        }
      })
      .catch(err => {
        if (!err.errCode) {
          this.$message.error('网络错误：' + err)
        }
        this.$router.replace('/login')
      })
  },
  components: {
    myHeader,
    myFooter,
    myAside
  }
}
</script>

<style lang="scss" scoped>
.baseLayout {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  min-height: 100vh;
}

.my-header,
.my-footer {
  flex: 0 0 auto;
}

.el-container {
  flex: 1 0 auto;
}

.el-aside {
  border-right: 1px solid #e0e0e0;
}
</style>
