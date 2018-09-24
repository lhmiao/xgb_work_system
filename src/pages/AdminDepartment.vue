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
        @click="openAddDialog">添加新部门</el-button>
      <el-dialog
        title="添加新部门"
        :visible.sync="addDialogVisible"
        width="550px">
        <div class="department-dialog-form">
          <el-select
            v-model="newType"
            placeholder="请选择新部门类型">
            <el-option
              v-for="(value, key) in departmentTypes"
              :key="key"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
          <el-input
            v-model="newName"
            placeholder="新部门名称"></el-input>
        </div>
        <span slot="footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
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
            @click="openEditDialog(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改部门信息"
      :visible.sync="editDialogVisible"
      width="550px">
      <div class="department-dialog-form">
        <el-select
          v-model="editType"
          placeholder="请选择部门类型">
          <el-option
            v-for="(value, key) in departmentTypes"
            :key="key"
            :label="value"
            :value="key">
          </el-option>
        </el-select>
        <el-input
          v-model="editName"
          placeholder="部门名称"></el-input>
      </div>
      <p class="tips">部门名称和类型至少要修改一个，单项不修改则使用旧的名称或类型</p>
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
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
import departmentTypes from '@/constant/departmentType'

const admin = new Admin()

export default {
  data () {
    return {
      newName: '',
      newType: '',
      editName: '',
      editType: '',
      editRow: null,
      departmentTypes,
      addDialogVisible: false,
      editDialogVisible: false,
      dialogLoading: false,
      departmentData: [],
      departmentDataLoading: false,
      pageCount: 0,
      currentPage: 1
    }
  },
  methods: {
    openAddDialog () {
      this.newName = ''
      this.newType = ''
      this.addDialogVisible = true
    },
    openEditDialog (editRow) {
      this.editName = ''
      this.editType = ''
      this.editDialogVisible = true
      this.editRow = editRow
    },
    addDepartment () {
      if (!this.newType) {
        this.$message.warning('请选择新部门类型')
        return
      } else if (!this.newName) {
        this.$message.warning('请输入新部门名称')
        return
      }
      this.dialogLoading = true
      const data = {
        apart_name: this.newName,
        apart_kind: this.newType
      }
      admin.addDepartment(data)
        .then(() => {
          this.dialogLoading = false
          this.addDialogVisible = false
          this.$message.success('添加新部门成功')
          this.loadDepartmentData(1)
        })
        .catch(err => {
          this.dialogLoading = false
          this.$message.error('添加新部门失败：' + err)
        })
    },
    editDepartment () {
      const id = this.editRow.id
      const oldName = this.editRow.apart_name
      const oldType = this.editRow.apart_kind.toString()
      if (!(this.editType || this.editName)) {
        this.$message.warning('请选择新的部门类型或部门名称')
        return
      }
      if ((this.editName === oldName) && (this.editType === oldType)) {
        this.$message.warning('新的名称和类型与旧的名称和类型相同，无效修改')
        return
      }
      this.dialogLoading = true
      const data = Object.assign(
        {
          id,
          apart_name: oldName,
          apart_kind: oldType
        },
        {
          apart_name: this.editName,
          apart_kind: this.editType
        }
      )
      admin.editDepartment(data)
        .then(() => {
          this.dialogLoading = false
          this.editDialogVisible = false
          this.$message.success('修改部门信息成功')
          this.loadDepartmentData(this.currentPage)
        })
        .catch(err => {
          this.dialogLoading = false
          this.$message.error('修改部门信息失败：' + err)
        })
    },
    getDepartmentType (row, column, cellValue, index) {
      return this.departmentTypes[cellValue]
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
        this.$message.error('删除失败：' + err)
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
          this.departmentDataLoading = false
        })
        .catch(err => {
          this.departmentDataLoading = false
          this.$message.error('加载部门信息失败' + err)
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
    flex: 0 0 160px;
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
