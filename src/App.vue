<template>
  <config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider as configProvider } from 'element-plus'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
</style>
