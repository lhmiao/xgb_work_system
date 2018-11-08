<template>
  <div class="admin-department">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Admin管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="add-department">
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="openDialogAdd">添加新部门</el-button>
      <el-dialog
        title="添加新部门"
        :visible.sync="dialogAddVisible"
        width="550px">
        <div class="department-dialog-form">
          <el-select
            v-model="typeNew"
            placeholder="请选择新部门类型">
            <el-option
              v-for="(type, code) in departmentType"
              :key="code"
              :label="type"
              :value="code">
            </el-option>
          </el-select>
          <el-input
            v-model="nameNew"
            placeholder="新部门名称"></el-input>
        </div>
        <span slot="footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addDepartment"
            :loading="dialogLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table
      :data="departmentData"
      v-loading="departmentDataLoading"
      border>
      <el-table-column
        label="部门名称"
        prop="apart_name">
      </el-table-column>
      <el-table-column
        label="部门类型"
        prop="apart_kind"
        :formatter="getDepartmentType">
      </el-table-column>
      <el-table-column
        label="操作"
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
      title="修改部门信息"
      :visible.sync="dialogEditVisible"
      width="550px">
      <div class="department-dialog-form">
        <el-select
          v-model="typeEdit"
          placeholder="请选择部门类型">
          <el-option
            v-for="(type, code) in departmentType"
            :key="code"
            :label="type"
            :value="code">
          </el-option>
        </el-select>
        <el-input
          v-model="nameEdit"
          placeholder="部门名称"></el-input>
      </div>
      <p class="tips">部门名称和类型至少要修改一个，单项不修改则使用旧的名称或类型</p>
      <span slot="footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editDepartment"
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
</template>

<script>
import Admin from '@/apis/Admin'
import departmentType from '@/constant/departmentType'

const admin = new Admin()

export default {
  data () {
    return {
      nameNew: '',
      typeNew: '',
      nameEdit: '',
      typeEdit: '',
      rowEdit: null,
      departmentType,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogLoading: false,
      departmentData: [],
      departmentDataLoading: false,
      pageCount: 0,
      currentPage: 1
    }
  },
  methods: {
    openDialogAdd () {
      this.nameNew = ''
      this.typeNew = ''
      this.dialogAddVisible = true
    },
    openDialogEdit (rowEdit) {
      this.nameEdit = ''
      this.typeEdit = ''
      this.dialogEditVisible = true
      this.rowEdit = rowEdit
    },
    addDepartment () {
      if (!this.typeNew) {
        this.$message.warning('请选择新部门类型')
        return
      } else if (!this.nameNew) {
        this.$message.warning('请输入新部门名称')
        return
      }
      this.dialogLoading = true
      const data = {
        apart_name: this.nameNew,
        apart_kind: this.typeNew
      }
      admin.addDepartment(data)
        .then(() => {
          this.nameNew = ''
          this.typeNew = ''
          this.dialogAddVisible = false
          this.$message.success('添加新部门成功')
          this.loadDepartmentData(1)
        })
        .catch(err => {
          if (err.errCode === 2) {
            this.$store.commit('logout')
            this.$router.push('/login')
            this.$message.info('登录状态已过期，请重新登录')
          } else {
            this.$message.error('添加新部门失败：' + err)
          }
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    editDepartment () {
      const id = this.rowEdit.id
      const nameOld = this.rowEdit.apart_name
      const typeOld = this.rowEdit.apart_kind.toString()
      if (!(this.typeEdit || this.nameEdit)) {
        this.$message.warning('请输入修改项')
        return
      }
      const data = {
        id,
        apart_name: this.nameEdit || nameOld,
        apart_kind: this.typeEdit || typeOld
      }
      if ((data.apart_name === nameOld) && (data.apart_kind === typeOld)) {
        this.$message.warning('选择修改的信息与该部门原来的信息一致，请核对修改项')
        return
      }
      this.dialogLoading = true
      admin.editDepartment(data)
        .then(() => {
          this.nameEdit = ''
          this.typeEdit = ''
          this.dialogEditVisible = false
          this.$message.success('修改部门信息成功')
          this.loadDepartmentData(this.currentPage)
        })
        .catch(err => {
          if (err.errCode === 2) {
            this.$store.commit('logout')
            this.$router.push('/login')
            this.$message.info('登录状态已过期，请重新登录')
          } else {
            this.$message.error('修改部门信息失败：' + err)
          }
        })
        .finally(() => {
          this.dialogLoading = false
        })
    },
    getDepartmentType (row, column, cellValue, index) {
      return this.departmentType[cellValue] || '未知部门类型'
    },
    handleDelete (index, id) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id
        }
        return admin.deleteDepartment(data)
      }).then(() => {
        this.$message.success('删除成功')
        this.departmentData.splice(index, 1)
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
    handleCurrentChange (page) {
      this.currentPage = page
      this.loadDepartmentData(page)
    },
    loadDepartmentData (page = 1) {
      this.departmentDataLoading = true
      const params = {
        page
      }
      admin.searchDepartment(params)
        .then(res => {
          this.departmentData = res.content
          this.pageCount = res.all_pages
        })
        .catch(err => {
          if (err.errCode === 2) {
            this.$store.commit('logout')
            this.$router.push('/login')
            this.$message.info('登录状态已过期，请重新登录')
          } else {
            this.$message.error('加载部门信息失败' + err)
          }
        })
        .finally(() => {
          this.departmentDataLoading = false
        })
    }
  },
  mounted () {
    this.loadDepartmentData()
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.el-select {
  width: 160px;
}

.department-dialog-form {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .el-select {
    flex: 0 0 170px;
    margin-right: 10px;
  }
}

.tips {
  margin-left: 20px;
  font-size: 13px;
  color: #888;
}

.department-dialog-form,
.add-department,
.el-table {
  margin-bottom: 20px;
}

.el-pagination {
  text-align: center;
}
</style>
