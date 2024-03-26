<template>
  <div class="container">
    <div>订单号</div>
    <div class="mt-[15px]">
      <el-input placeholder="请输入订单号查询订单" size="large" v-model="orderNo" />
    </div>
    <div class="mt-[20px]">
      <el-button type="primary" @click="onSearch">查找订单</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from '@/libs'

const orderNo = ref()
const router = useRouter()

const onSearch = () => {
  if (!orderNo.value) {
    message.error('订单编号不能为空')
    return
  }
  router.push(`/resource/order-detail/${orderNo.value}`)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
}
</style>
