<template>
  <div class="notifacation">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>通知管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="top">
      <div class="search-notification">
        <el-select v-model="department" placeholder="请选择部门">
          <el-option
            v-for="(departmentName, departmentCode) in departmentOptions"
            :label="departmentName"
            :value="departmentCode"
            :key="departmentCode">
          </el-option>
        </el-select>
        <el-input placeholder="请输入关键词" v-model="keyword" class="keyword"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchNotification">搜索</el-button>
        <el-button @click="resetSearch" class="reset-search">重置</el-button>
      </div>
      <el-button type="success" icon="el-icon-plus" @click="dialogVisible = true">发布通知</el-button>
      <el-dialog
        title="发布新通知"
        :visible.sync="dialogVisible"
        width="550px">
        <el-input class="new-title-input" v-model="newTitle" placeholder="标题"></el-input>
        <el-input type="textarea" v-model="newContent" placeholder="内容" :autosize="{ minRows: 3}"></el-input>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="uploadNewNotification" :loading="dialogLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="search-data" v-if="hasSearched">
      <el-table
        v-loading="loading"
        :data="searchData"
        border>
        <el-table-column label="日期" prop="date" :formatter="formatDate">
        </el-table-column>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column
          prop="author"
          label="发布者">
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            {{ scope.row.apart | formatDepartment }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="500">
        </el-table-column>
        <el-table-column label="内容" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="toNotificationDetail(scope.row.id)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
           <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import Notification from '@/apis/Notification'
import departments from '@/constant/departmentInfo'

const notification = new Notification()

export default {
  data () {
    return {
      department: '',
      keyword: '',
      departmentOptions: departments,
      loading: false,
      dialogVisible: false,
      dialogLoading: false,
      newTitle: '',
      newContent: '',
      hasSearched: false,
      searchData: [],
      pageCount: 0,
      currentPage: 1
    }
  },
  methods: {
    resetSearch () {
      this.department = ''
      this.keyword = ''
    },
    searchNotification () {
      if (!(this.department || this.keyword)) {
        this.$message.error('请选择部门或输入关键词')
        return
      }
      this.loading = true
      this.hasSearched = true
      const params = {
        page: this.currentPage,
        keywords: this.keyword,
        apart: this.department
      }
      notification.search(params)
        .then(res => {
          this.searchData = res.content
          this.pageCount = res.all_pages
          this.loading = false
        })
        .catch(err => {
          this.$message.error('搜索失败：' + err)
          this.loading = false
        })
    },
    uploadNewNotification () {
      if (!(this.newTitle)) {
        this.$message.error('请输入标题')
        return
      } else if (!(this.newContent)) {
        this.$message.error('请输入内容')
        return
      }
      this.dialogLoading = true
      const data = {
        title: this.newTitle,
        content: this.newContent
      }
      notification.upload(data)
        .then(() => {
          this.dialogVisible = false
          this.dialogLoading = false
          this.newTitle = ''
          this.newContent = ''
          this.$message.success('发布新通知成功')
        })
        .catch(err => {
          this.dialogLoading = false
          this.$message.error('发布新通知失败：' + err)
        })
    },
    toNotificationDetail (id) {
      this.$router.push(`/notification/${id}`)
    },
    formatDate (row, column, cellValue, index) {
      return cellValue.slice(0, 10)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id
        }
        return notification.delete(params)
      }).then(() => {
        this.$message.success('删除成功')
        this.searchData.splice(index, 1)
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
      this.searchNotification()
    }
  },
  filters: {
    formatDepartment (departmentCode) {
      return departments[departmentCode] || '未知部门'
    }
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
}

.new-title-input {
  margin-bottom: 20px;
}

.search-notification {
  display: flex;
  flex-flow: row nowrap;

  .el-select {
    flex: 0 0 150px;
    margin-right: 20px;
  }
}

.keyword {
  flex-basis: 500px;
  margin-right: 20px;
}

.search-data {
  .el-table {
    margin-bottom: 20px;
  }

  .el-pagination {
    text-align: center;
  }
}
</style>
