<template>
  <div class="admin-user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Admin管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="top">
      <div class="search-user">
        <el-select
          v-model="departmentSearch"
          placeholder="请选择部门">
          <el-option
            v-for="(departmentName, departmentCode) in departmentOptions"
            :label="departmentName"
            :value="departmentCode"
            :key="departmentCode">
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchUser">搜索</el-button>
        <el-button
          class="reset-search"
          @click="resetSearch">重置</el-button>
      </div>
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="openDialogAdd">添加用户</el-button>
      <el-dialog
        title="添加用户"
        :visible.sync="dialogAddVisible"
        width="550px">
        <div class="dialog-user-select">
          <el-select
            v-model="departmentAdd"
            placeholder="请选择部门">
            <el-option
              v-for="(departmentName, departmentCode) in departmentOptions"
              :label="departmentName"
              :value="departmentCode"
              :key="departmentCode">
            </el-option>
          </el-select>
          <el-select
            v-model="authorityAdd"
            placeholder="请选择身份(权限等级)">
            <el-option
              v-for="(identity, authority) in identityByAuth"
              :label="identity"
              :value="authority"
              :key="authority">
            </el-option>
          </el-select>
        </div>
        <el-input
          class="name-input"
          v-model="nameAdd"
          placeholder="用户名"></el-input>
        <el-input
          class="true-name-input"
          v-model="trueNameAdd"
          placeholder="真实姓名"></el-input>
        <el-input
          type="password"
          v-model="passwordAdd"
          placeholder="密码"></el-input>
        <span slot="footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addUser"
            :loading="dialogLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="user-data">
      <el-table
        v-loading="userDataLoading"
        :data="userData"
        border>
        <el-table-column
          label="用户名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="所属部门"
          prop="apart"
          :formatter="getDepartment">
        </el-table-column>
        <el-table-column
          label="身份(权限等级)"
          prop="authority"
          :formatter="getIdentityByAuth">
        </el-table-column>
        <el-table-column
          label="真实姓名"
          prop="true_name">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openDialogEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="修改用户信息"
        :visible.sync="dialogEditVisible"
        width="550px">
        <div class="dialog-user-select">
          <el-select
            v-model="departmentEdit"
            placeholder="请选择部门">
            <el-option
              v-for="(departmentName, departmentCode) in departmentOptions"
              :label="departmentName"
              :value="departmentCode"
              :key="departmentCode">
            </el-option>
          </el-select>
          <el-select
            v-model="authorityEdit"
            placeholder="请选择身份(权限等级)">
            <el-option
              v-for="(identity, authority) in identityByAuth"
              :label="identity"
              :value="authority"
              :key="authority">
            </el-option>
          </el-select>
        </div>
        <el-input
          class="true-name-input"
          v-model="trueNameEdit"
          placeholder="真实姓名"></el-input>
        <p class="tips">用户信息至少修改一个，没修改则使用旧的信息</p>
        <span slot="footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="editUser"
            :loading="dialogLoading">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :page-count="pageCount"
        :current-page="currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Admin from '@/apis/Admin'
import departmentOptions from '@/constant/departmentInfo'
import identityByAuth from '@/constant/identityByAuthority'

const admin = new Admin()

export default {
  data () {
    return {
      departmentOptions,
      departmentSearch: '',
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogLoading: false,
      departmentAdd: '',
      authorityAdd: '',
      nameAdd: '',
      trueNameAdd: '',
      passwordAdd: '',
      departmentEdit: '',
      authorityEdit: '',
      nameEdit: '',
      trueNameEdit: '',
      passwordEdit: '',
      rowEdit: null,
      userData: [],
      userDataLoading: false,
      identityByAuth,
      pageCount: 0,
      currentPage: 1
    }
  },
  methods: {
    searchUser () {
      this.userDataLoading = true
      const params = {
        apart: this.departmentSearch,
        page: this.currentPage
      }
      admin.searchUser(params)
        .then(res => {
          this.userData = res.content
          this.pageCount = res.all_pages
        })
        .catch(err => {
          if (err.errCode === 2) {
            this.$store.commit('logout')
            this.$router.push('/login')
            this.$message.info('登录状态已过期，请重新登录')
          } else {
            this.$message.error('搜索用户信息失败：' + err)
          }
        })
        .finally(() => {
          this.userDataLoading = false
        })
    },
    resetSearch () {
      this.departmentSearch = ''
    },
    openDialogAdd () {
      this.departmentAdd = ''
      this.authorityAdd = ''
      this.nameAdd = ''
      this.trueNameAdd = ''
      this.passwordAdd = ''
      this.dialogAddVisible = true
    },
    addUser () {
      if (!this.departmentAdd) {
        this.$message.warning('请选择部门')
        return
      } else if (!this.authorityAdd) {
        this.$message.warning('请选择身份(权限)')
        return
      } else if (!this.nameAdd) {
        this.$message.warning('请输入用户名')
        return
      } else if (!this.trueNameAdd) {
        this.$message.warning('请输入真实姓名')
        return
      } else if (!this.passwordAdd) {
        this.$message.warning('请输入密码')
        return
      }
      this.dialogLoading = true
      const data = {
        apart: this.departmentAdd,
        authority: this.authorityAdd,
        name: this.nameAdd,
        true_name: this.trueNameAdd,
        passwd: this.passwordAdd
      }
      admin.addUser(data)
        .then(() => {
          this.departmentAdd = ''
          this.authorityAdd = ''
          this.nameAdd = ''
          this.trueNameAdd = ''
          this.passwordAdd = ''
          this.dialogAddVisible = false
          this.$message.success('添加新用户成功')
          this.searchUser()
        })
        .catch(err => {
          if (err.errCode === 2) {
            this.$store.commit('logout')
            this.$router.push('/login')
            this.$message.info('登录状态已过期，请重新登录')
          } else {
            this.$message.error('添加新用户失败：' + err)
          }
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    openDialogEdit (rowEdit) {
      this.departmentEdit = ''
      this.authorityEdit = ''
      this.nameEdit = ''
      this.trueNameEdit = ''
      this.passwordEdit = ''
      this.dialogEditVisible = true
      this.rowEdit = rowEdit
    },
    editUser () {
      const id = this.rowEdit.id
      const departmentOld = this.rowEdit.apart.toString()
      const authorityOld = this.rowEdit.authority.toString()
      const trueNameOld = this.rowEdit.true_name
      if (!(this.departmentEdit || this.authorityEdit || this.trueNameEdit)) {
        this.$message.warning('请输入修改项')
        return
      }
      const data = {
        id,
        apart: this.departmentEdit || departmentOld,
        authority: this.authorityEdit || authorityOld,
        true_name: this.trueNameEdit || trueNameOld
      }
      if ((data.apart === departmentOld) && (data.authority === authorityOld) && (data.true_name === trueNameOld)) {
        this.$message.warning('选择修改的信息与该用户原来的信息一致，请核对修改项')
        return
      }
      this.dialogLoading = true
      admin.editUser(data)
        .then(() => {
          this.departmentEdit = ''
          this.authorityEdit = ''
          this.nameEdit = ''
          this.trueNameEdit = ''
          this.passwordEdit = ''
          this.dialogEditVisible = false
          this.$message.success('修改用户信息成功')
          this.searchUser()
        })
        .catch(err => {
          if (err.errCode === 2) {
            this.$store.commit('logout')
            this.$router.push('/login')
            this.$message.info('登录状态已过期，请重新登录')
          } else {
            this.$message.error('添加新用户失败：' + err)
          }
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    handleDelete (index, id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id
        }
        return admin.deleteUser(data)
      }).then(() => {
        this.$message.success('删除成功')
        this.userData.splice(index, 1)
      }).catch(err => {
        if (err.toString() === 'cancel') {
          this.$message.info('取消删除')
          return
        }
        if (err.errCode === 2) {
          this.$store.commit('logout')
          this.$router.push('/login')
          this.$message.info('登录状态已过期，请重新登录')
        } else {
          this.$message.error('删除失败：' + err)
        }
      })
    },
    getDepartment (row, column, cellValue, index) {
      return departmentOptions[cellValue] || '未知部门'
    },
    getIdentityByAuth (row, column, cellValue, index) {
      return identityByAuth[cellValue] || '无效权限'
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.searchUser()
    }
  },
  mounted () {
    this.searchUser()
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.top {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .el-select {
    margin-right: 20px;
  }
}

.name-input,
.true-name-input {
  margin-bottom: 20px;
}

.dialog-user-select {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .el-select {
    flex: 0 0 48%;
    margin-right: 0;
  }
}

.el-table {
  margin-bottom: 20px;
}

.tips {
  margin-left: 20px;
  font-size: 13px;
  color: #888;
}

.el-pagination {
  text-align: center;
}
</style>
