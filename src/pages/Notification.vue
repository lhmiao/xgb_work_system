<template>
  <div class="notifacation">
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
    <div class="search-data">
      <el-table
        v-loading="loading"
        :data="searchData"
        border>
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{ scope.row.date | formatDate }}
          </template>
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
        <el-table-column label="标题">
          <template slot-scope="scope">
            <el-popover
              trigger="click"
              placement="top"
              title="标题"
              :content="scope.row.title">
              <el-button slot="reference" type="text" size="mini">点击查看详情</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <el-popover
              trigger="click"
              placement="top"
              title="内容"
              :content="scope.row.content">
              <el-button slot="reference" type="text" size="mini">点击查看详情</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        :page-count="10">
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
      searchData: [
        {
          date: '2018-06-05 19:00:25',
          id: 123,
          author: '管理员',
          apart: 1,
          title: '这是标题',
          content: '这是内容'
        }
      ]
    }
  },
  methods: {
    resetSearch () {
      this.department = ''
      this.keyword = ''
    },
    searchNotification (e, page = 1) {
      if (!(this.department || this.keyword)) {
        this.$message.error('请选择部门或输入关键词')
        return
      }
      this.loading = true
      const params = {
        page,
        keywords: this.keyword,
        apart: this.department
      }
      notification.search(params)
        .then(res => {
          console.log(res)
          this.loading = false
        })
        .catch(err => {
          this.$message.error('搜索失败：' + err)
          this.loading = false
        })
    },
    handleDelete (index, row) {
      const params = {
        id: row.id
      }
      notification.delete(params)
        .then(() => {
          this.$message.success('删除成功')
          this.searchData.splice(index, 1)
        })
        .catch(err => {
          this.$message.error('删除失败：' + err)
        })
    },
    handleCurrentChange (page) {
      this.searchNotification(page)
    }
  },
  filters: {
    formatDate (date) {
      return date.slice(0, 10)
    },
    formatDepartment (departmentCode) {
      return departments[departmentCode] || '未知部门'
    }
  }
}
</script>

<style lang="scss" scoped>
.search-notification {
  display: flex;
  flex-flow: row nowrap;
  margin: 20px 0;

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
