<template>
  <div class="block-loading">
    <div class="block-loading-box">
      <div class="block-loading-box-warp">
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.block-loading .block-loading-box-warp {
  width: 80px;
  height: 80px;
}

.block-loading .block-loading-box-warp .block-loading-box-item {
  width: 33.333333%;
  height: 33.333333%;
  background: #409eff;
  float: left;
  animation: block-loading-animation 1.2s infinite ease;
  border-radius: 1px;
}

.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(7) {
  animation-delay: 0s;
}

.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(4),
.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(8) {
  animation-delay: 0.1s;
}

.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(1),
.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(5),
.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(9) {
  animation-delay: 0.2s;
}

.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(2),
.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(6) {
  animation-delay: 0.3s;
}

.block-loading .block-loading-box-warp .block-loading-box-item:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes block-loading-animation {
  0%,
  70%,
  to {
    transform: scaleZ(1);
  }

  35% {
    transform: scale3D(0, 0, 1);
  }
}
</style>
