<template>
  <div class="file">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ getFileType }}文件管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="top">
      <div class="search-file">
        <el-select
          v-model="department"
          placeholder="请选择部门">
          <el-option
            v-for="(departmentName, departmentCode) in departmentOptions"
            :label="departmentName"
            :value="departmentCode"
            :key="departmentCode">
          </el-option>
        </el-select>
        <el-input
          class="keyword"
          placeholder="请输入关键词"
          v-model="keyword"></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchFile">搜索</el-button>
        <el-button
          class="reset-search"
          @click="resetSearch">重置</el-button>
      </div>
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="openDialog">上传文件</el-button>
      <el-dialog
        title="上传文件"
        :visible.sync="dialogVisible"
        width="550px">
        <label class="file-input-label" for="fileInput">选择文件</label>
        <input
          id="fileInput"
          type="file"
          @change="addFile">
        <span class="file-info">
          {{ file ? file.name : "当前尚未选择文件" }}
        </span>
        <p class="tips">
          允许的文件类型：
          jpg, gif, jpeg, rar, pdf, zip, doc, docx, xls, xlsx, ppt, pptx
        </p>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="uploadFile"
            :loading="dialogLoading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="search-data" v-if="hasSearched">
      <el-table
        v-loading="loading"
        :data="searchData"
        border>
        <el-table-column
          label="日期"
          prop="date"
          :formatter="formatDate">
        </el-table-column>
        <el-table-column
          label="部门"
          prop="apart"
          :formatter="formatDepartment">
        </el-table-column>
        <el-table-column
          prop="author"
          label="发布者">
        </el-table-column>
        <el-table-column
          prop="file"
          label="文件名"
          width="500">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
           <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDownload(scope.row.id, scope.row.file)">下载</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
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
import File from '@/apis/File'
import departments from '@/constant/departmentInfo'

export default {
  data () {
    return {
      // fileCilent是封装的api对象，用来发送请求
      fileClient: null,
      department: '',
      keyword: '',
      departmentOptions: departments,
      dialogVisible: false,
      dialogLoading: false,
      // file是上传的文件对象
      file: null,
      loading: false,
      hasSearched: false,
      searchData: [],
      pageCount: 0,
      currentPage: 1
    }
  },
  computed: {
    getFileType () {
      switch (this.$route.params.fileType) {
        case 'download': return '下载区'
        case 'workfile': return '工作区'
      }
    }
  },
  methods: {
    searchFile () {
      if (!(this.department || this.keyword)) {
        this.$message.error('请选择部门或输入关键词')
        return
      }
      this.loading = true
      this.hasSearched = true
      const params = {
        page: this.currentPage,
        apart: this.department,
        keywords: this.keywords
      }
      this.fileClient.search(params)
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
    resetSearch () {
      this.department = ''
      this.keyword = ''
    },
    openDialog () {
      this.file = null
      this.dialogVisible = true
    },
    addFile (e) {
      this.file = e.target.files[0]
    },
    uploadFile () {
      if (!this.file) {
        this.$message.warning('请选择要上传的文件')
        return
      }
      this.dialogLoading = true
      const data = {
        upload: this.file
      }
      this.fileClient.upload(data)
        .then(() => {
          this.dialogVisible = false
          this.dialogLoading = false
          this.file = null
          this.$message.success('上传文件成功')
        })
        .catch(err => {
          this.dialogLoading = false
          this.$message.error('上传文件失败：' + err)
        })
    },
    formatDate (row, column, cellValue, index) {
      return cellValue.slice(0, 10)
    },
    formatDepartment (row, column, cellValue, index) {
      return departments[cellValue] || '未知部门'
    },
    handleDownload (id, fileName) {
      const data = {
        id
      }
      this.fileClient.download(data)
        .then(res => {
          this.downloadFile(res, fileName)
        })
        .catch(err => {
          if (err.errCode === 1) {
            this.$message.warning('该文件不存在')
          } else {
            this.$message.error('下载失败：' + err)
          }
        })
    },
    downloadFile (url, fileName) {
      let a = document.createElement('a')
      a.download = fileName
      a.href = url
      a.click()
      a = null
    },
    handleDelete (index, id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id
        }
        return this.fileClient.delete(data)
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
      this.searchFile()
    }
  },
  created () {
    let fileType = this.$route.params.fileType
    // 根据文件类型创建fileClient对象
    this.fileClient = new File(fileType)
  },
  beforeRouteUpdate (to, from, next) {
    this.resetSearch()
    this.hasSearched = false
    next()
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

.file-input-label {
  display: inline-block;
  width: 80px;
  height: 35px;
  margin-right: 10px;
  margin-bottom: 20px;
  line-height: 35px;
  text-align: center;
  color: white;
  border-radius: 3px;
  background: #409efe;
  cursor: pointer;

  &:hover {
    filter: brightness(1.08);
  }
}

#fileInput {
  display: none;
}

.tips {
  margin-left: 10px;
  font-size: 13px;
  color: #888;
}

.search-file {
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

.el-table {
  margin-bottom: 20px;
}

.el-pagination {
  text-align: center;
}
</style>
