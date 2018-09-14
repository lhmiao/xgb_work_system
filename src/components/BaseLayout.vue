<template>
  <div class="baseLayout">
    <my-header></my-header>
    <main>
      <router-view></router-view>
    </main>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from './MyHeader'
import myFooter from './MyFooter'

export default {
  created () {
    // check login in here
  },
  components: {
    myHeader,
    myFooter
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

main {
  flex: 1 0 auto;
}
</style>
