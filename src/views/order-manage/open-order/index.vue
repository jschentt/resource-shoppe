<template>
  <order-list v-if="isLogin" />
  <el-card v-else>
    <el-tabs v-model="activeName">
      <el-tab-pane label="浏览器缓存" name="browser-cache"> <browser-cache /></el-tab-pane>
      <el-tab-pane label="订单号" name="order-num"> <order-num /></el-tab-pane>
      <el-tab-pane label="验证信息" name="verify-message"> <verify-message /></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { BrowserCache, OrderNum, VerifyMessage } from './components'
import useGlobalConfig from '@/hooks/useGlobalConfig'
import OrderList from '../auth-order/index.vue'

const { isLogin } = useGlobalConfig()
const activeName = ref('browser-cache')
</script>

<style lang="scss" scoped></style>
