<template>
  <div class="baseLayout">
    <my-header></my-header>
    <el-container>
      <el-aside width="220px" v-if="isLoggedIn">
        <my-aside></my-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from './MyHeader'
import myFooter from './MyFooter'
import myAside from './MyAside'

export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    // this.$store.commit('logout')
  },
  components: {
    myHeader,
    myFooter,
    myAside
  }
}
</script>

<style lang="scss" scoped>
.baseLayout {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  min-height: 100vh;
}

.my-header,
.my-footer {
  flex: 0 0 auto;
}

.el-container {
  flex: 1 0 auto;
}

.el-aside {
  border-right: 1px solid #e0e0e0;
}
</style>
