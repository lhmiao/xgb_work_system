<template>
  <div class="loading">
    <div class="loading-container">
      <div class="loading-circle">
        <div class="loading-spinner"></div>
      </div>
      <p class="loading-msg">玩命加载中</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.loading {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
}

.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  /* 修改 font-size 来控制loading的大小 */
  font-size: 40px;
  transform: translate(-50%, -50%);
}

.loading-circle {
  width: 1em;
  height: 1em;
  margin: auto;
  box-shadow: inset 0 0 0 0.1em rgba(58, 168, 237, .2);
  border-radius: 50%;
}

.loading-spinner {
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: inset(0 0 0 50%);
  animation: spinner-clip-rect 1.2s ease-in-out infinite;
}

@keyframes spinner-clip-rect {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

.loading-spinner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 0.1em #3aa8ed;
  border-radius: 50%;
  clip-path: inset(0 50% 0 0);
  animation: spinner-circle 1.2s ease-in-out infinite;
}

@keyframes spinner-circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-msg {
  margin-top: 1em;
  font-size: 0.4em;
}
</style>
