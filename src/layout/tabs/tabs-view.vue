<template>
  <div class="tabs-view">
    <div class="tabs-view-content">
      <router-transition />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.tabs-view {
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 20px;
  .tabs-view-content {
    padding: 10px;
    width: 100%;
    max-width: 1190px;
    box-sizing: border-box;
    border-radius: 5px;
  }
}
</style>
