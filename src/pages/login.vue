<template>
  <div class="login">
    <div class="title">登录</div>
    <el-input
      class="username"
      v-model="username"
      placeholder="用户名"></el-input>
    <el-input
      class="password"
      type="password"
      v-model="password"
      placeholder="密码"></el-input>
    <div class="action">
      <el-checkbox v-model="checked">记住我</el-checkbox>
      <!-- <el-button
        type="text"
        @click="resetPassword">忘记密码</el-button> -->
    </div>
    <el-button
      class="login-btn"
      type="primary"
      @click="login"
      :loading="loading">登录</el-button>
  </div>
</template>

<script>
import User from '@/apis/User'

const user = new User()

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      checked: false,
      loading: false
    }
  },
  methods: {
    resetPassword () {
      this.$router.push('/resetPassword')
    },
    login () {
      if (this.username === '') {
        this.$message.warning('请输入用户名')
        return
      } else if (this.password === '') {
        this.$message.warning('请输入密码')
        return
      }
      if (this.checked) {
        const loginInfo = {
          username: this.username,
          password: this.password
        }
        localStorage.loginInfo = JSON.stringify(loginInfo)
      } else {
        localStorage.clear()
      }
      this.loading = true
      const data = {
        name: this.username,
        passwd: this.password
      }
      user.login(data)
        .then(res => {
          this.$store.commit('initUserInfo', res)
          this.$store.commit('login')
          this.$message.success('登录成功')
          this.$router.push('/index')
        })
        .catch(err => {
          this.$message.error('登录失败：' + err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created () {
    if (this.$store.state.isLoggedIn) {
      this.$message.warning('您已登录，请勿重复登录')
      this.$router.replace('/index')
      return
    }
    if (localStorage.loginInfo === undefined) {
      this.checked = false
    } else {
      this.checked = true
      const loginInfo = JSON.parse(localStorage.loginInfo)
      this.username = loginInfo.username
      this.password = loginInfo.password
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  top: 50%;
  left: 50%;
  width: 380px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  transform: translate(-50%, -50%);

  .title {
    margin-bottom: 20px;
    padding: 10px 0 20px 0;
    font-size: 20px;
    text-align: center;
    color: #555;
    border-bottom: 1px solid #e0e0e0;
  }

  .username {
    margin-bottom: 30px;
  }

  .password {
    margin-bottom: 20px;
  }

  .action {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
