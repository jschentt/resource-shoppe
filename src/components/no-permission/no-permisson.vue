<template>
  <el-empty description="您还没有登录哦~">
    <el-button type="primary" @click="login">登录</el-button>
  </el-empty>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const login = () => {
  router.replace({
    name: 'login',
    query: {
      redirect: route.fullPath
    }
  })
}
</script>
