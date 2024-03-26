<template>
  <el-skeleton :loading="loading" animated class="p-[10px]">
    <template #template>
      <el-skeleton-item variant="image" style="width: 100%; height: 240px" />
      <div style="padding: 14px 0">
        <el-skeleton-item variant="p" style="width: 50%" />
        <div
          style="display: flex; align-items: center; justify-items: space-between"
          class="mt-[20px]"
        >
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 80%" />
        </div>
        <div
          style="display: flex; align-items: center; justify-items: space-between"
          class="mt-[20px]"
          v-for="i in 2"
          :key="i"
        >
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
        <div
          style="display: flex; align-items: center; justify-items: space-between"
          class="mt-[20px]"
          v-for="i in 20"
          :key="i"
        >
          <el-skeleton-item variant="text" style="width: 100%" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>
