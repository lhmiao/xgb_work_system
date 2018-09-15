<template>
  <div class="reset-password">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <div class="title" slot="header">
        修改密码
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
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
</style>
