<template>
  <div>
    <cache-order-list v-if="showOrder" />
    <el-empty v-else>
      <template #description> 您的浏览器缓存中没有任何订单 </template>
      <el-button type="primary" @click="$router.push('/resource/home')">去逛逛～</el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import CacheOrderList from './order-message/cache-order-list.vue'

const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
const cacheEmail = localStorage.getItem('email')
const showOrder = ref(Boolean(cacheEmail) && emailReg.test(cacheEmail))
</script>

<style lang="scss" scoped></style>
