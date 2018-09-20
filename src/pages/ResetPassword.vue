<template>
  <div class="reset-password">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="isLoggedIn">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <div class="title" slot="header">
        修改密码
      </div>
      <div class="reset-password-form">
        <el-input v-model="newPassword1" placeholder="请输入新密码"></el-input>
        <el-input v-model="newPassword2" placeholder="请再次输入新密码"></el-input>
        <el-button type="primary" @click="resetPassword">确认修改</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import User from '@/apis/User'

const user = new User()

export default {
  data () {
    return {
      newPassword1: '',
      newPassword2: ''
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    resetPassword () {
      if (!this.newPassword1) {
        this.$message.error('请输入的密码')
        return
      } else if (!this.newPassword2) {
        this.$message.error('请再次输入的密码')
      } else if (this.newPassword1 !== this.newPassword2) {
        this.$message.error('两次输入的密码不一致')
        return
      }
      const data = {
        pwd: this.newPassword2
      }
      user.resetPassword(data)
        .then(() => {
          this.$store.commit('logout')
          this.$message.success('修改密码成功，请重新登录')
          this.$router.push('/login')
        })
        .catch(err => {
          this.$message.error('修改密码失败：' + err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-card {
  width: 400px;
  margin: 100px auto 0 auto;
}

.reset-password-form {
  .el-input {
    margin-bottom: 25px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
