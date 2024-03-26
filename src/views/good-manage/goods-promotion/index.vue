<template>
  <div>
    <el-card>
      <h3>友情提醒！！！</h3>
      <p>您在本网站购买的商品，如遇任何问题请咨询客服微信：{{ account }} ，备注：麦云分享</p>
    </el-card>
    <div class="mt-[24px]">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/resource/home' }">网站首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ account }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <goods-list :account="account" />
  </div>
</template>

<script setup lang="ts">
import { GoodsList } from '@/views/home/components'

const account = ref()

const route = useRoute()

onMounted(() => {
  const { name } = route.params
  const run = () => {
    account.value = name
  }
  if (name) {
    run()
  }
})
</script>
<style scoped></style>
