<template>
  <div class="userinfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>我的信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <div slot="header">
        我的信息
      </div>
      <div class="info-item">
        id:
        <span>{{getUserId}}</span>
      </div>
      <div class="info-item">
        用户名:
        <span>{{getUserName}}</span>
      </div>
      <div class="info-item">
        真实姓名:
        <span>{{getTrueName}}</span>
      </div>
      <div class="info-item">
        所属部门:
        <span>{{getDepartment}}</span>
      </div>
      <div class="info-item">
        身份:
        <span>{{getIdentityByAuthority}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import departmentInfo from '@/constant/departmentInfo'
import identity from '@/constant/identityByAuthority'

export default {
  computed: {
    getUserId () {
      return this.$store.state.userInfo.userId
    },
    getUserName () {
      return this.$store.state.userInfo.userName
    },
    getTrueName () {
      return this.$store.state.userInfo.trueName
    },
    getDepartment () {
      const departmentCode = this.$store.state.userInfo.department
      return departmentInfo[departmentCode] || '未知部门'
    },
    getIdentityByAuthority () {
      const authorityCode = this.$store.state.userInfo.authority
      return identity[authorityCode] || '未知身份'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-card {
  width: 500px;
  margin: 100px auto 0 auto;
}

.info-item {
  line-height: 40px;
  color: #888;

  span {
    margin-left: 10px;
    color: #333;
  }
}
</style>
