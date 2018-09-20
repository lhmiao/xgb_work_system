<template>
  <div class="my-aside">
    <el-menu router>
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/notification">
        <i class="el-icon-news"></i>
        <span slot="title">通知管理</span>
      </el-menu-item>
      <el-submenu index="file">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文件管理</span>
        </template>
        <el-menu-item index="/file/download">下载区文件</el-menu-item>
        <el-menu-item index="/file/work">工作区文件</el-menu-item>
      </el-submenu>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>个人信息</span>
        </template>
        <el-menu-item index="/userInfo">我的信息</el-menu-item>
        <el-menu-item index="/resetPassword">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="admin" v-if="isAdmin">
        <template slot="title">
          <i class="el-icon-star-off"></i>
          <span>Admin管理</span>
        </template>
        <el-menu-item index="/admin/department">部门管理</el-menu-item>
        <el-menu-item index="/admin/user">用户管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin () {
      if (this.$store.state.userInfo.authority === 3) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
</style>
