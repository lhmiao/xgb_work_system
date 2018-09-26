<template>
  <div class="notification-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to='/notification'>通知管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="notification-detail-item date">
      <div>
        日期：<span>{{ date }}</span>
      </div>
      <el-button
        type="danger"
        size="medium"
        @click="handleDelete">删除</el-button>
    </div>
    <div class="notification-detail-item">
      id：<span>{{ id }}</span>
    </div>
    <div class="notification-detail-item">
      发布者：<span>{{ author }}</span>
    </div>
    <div class="notification-detail-item">
      部门：<span>{{ departmentCode | formatDepartment }}</span>
    </div>
    <div class="notification-detail-item content">
      <div class="title"><b>{{ title }}</b></div>
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import Notification from '@/apis/Notification'
import departmentInfo from '@/constant/departmentInfo'

const notification = new Notification()

export default {
  name: 'notificationDetail',
  data () {
    return {
      date: '',
      id: '',
      author: '',
      departmentCode: '',
      title: '',
      content: ''
    }
  },
  methods: {
    formatContent (content) {
      let newContent = content
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/(&nbsp;|&nbsp)/g, ' ')
      return newContent
    },
    handleDelete () {
      this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: this.id
        }
        return notification.delete(params)
      }).then(() => {
        this.$message.success('删除成功，请重新搜索该通知或刷新页面确认')
        this.$router.replace('/notification')
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
    }
  },
  filters: {
    formatDepartment (departmentCode) {
      return departmentInfo[departmentCode] || '未知部门'
    }
  },
  mounted () {
    const params = {
      id: this.$route.params.id
    }
    notification.search(params)
      .then(res => {
        this.date = res.date
        this.id = res.id
        this.author = res.author
        this.departmentCode = res.apart
        this.title = res.title
        this.content = this.formatContent(res.content)
      })
      .catch(err => {
        if (err.errCode === 2) {
          this.$store.commit('logout')
          this.$router.push('/login')
          this.$message.info('登录状态已过期，请重新登录')
        } else {
          this.$message.error('系统错误：' + err)
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.notification-detail-item {
  margin-bottom: 20px;
  color: #555;

  span {
    margin-left: 10px;
    color: #333;
  }
}

.date {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1045px;
}

.content {
  max-width: 1000px;
  padding: 20px;
  border-left: 5px solid #409eff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);

  .title {
    margin-bottom: 10px;
    color: #333;
  }
}
</style>
