<template>
  <div class="my-header">
    <span class="title" @click="toIndex" title="回到首页">电子科技大学学工部工作系统</span>
    <el-dropdown v-if="isloggedIn" @command="handleCommand">
      <span class="el-dropdown-link">
        我的信息<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button type="text" v-else @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  computed: {
    isloggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    toIndex () {
      this.$router.push('/index')
    },
    handleCommand (command) {
      switch (command) {
        case 'resetPassword': this.resetPassword()
          return
        case 'logout': this.logout()
          return
        default: this.$message.error('无效command')
      }
    },
    resetPassword () {
      this.$router.push('/resetPassword')
    },
    logout () {
      // log out
    },
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 70px;
  font-size: 18px;
  color: #037ef3;
  border-bottom: 1px solid #e0e0e0;

  .title {
    cursor: pointer;
  }
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
