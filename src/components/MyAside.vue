<template>
  <div class="my-aside">
    <el-menu router>
      <el-menu-item index="/news">
        <i class="el-icon-news"></i>
        <span slot="title">通知管理</span>
      </el-menu-item>
      <el-submenu index="document">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文件管理</span>
        </template>
        <el-menu-item index="/document/download">下载区文件</el-menu-item>
        <el-menu-item index="/document/work">工作区文件</el-menu-item>
      </el-submenu>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item index="/userInfo">我的信息</el-menu-item>
        <el-menu-item index="/resetPassword">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="admin">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span>Admin管理</span>
        </template>
        <el-menu-item index="/manage/department">部门管理</el-menu-item>
        <el-menu-item index="/manage/user">用户管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>
