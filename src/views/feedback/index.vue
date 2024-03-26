<template>
  <div v-if="isLogin">
    <el-input
      v-model="content"
      :autosize="{ minRows: 6, maxRows: 6 }"
      type="textarea"
      placeholder="请输入反馈信息"
    />
    <div class="mt-[24px]">
      <el-button type="primary" :loading="loading" @click="save" :disabled="disabled"
        >保存</el-button
      >
    </div>
  </div>
  <template v-else>
    <no-permission />
  </template>
</template>

<script setup lang="ts">
import { CURRENT_USER } from '@/store/mutation-types'
import { storage } from '@/libs/Storage'
import { createFeedback } from '@/api/feedback'
import { NoPermission } from '@/components/no-permission'
import { message } from '@/libs'

const store = useStore()
const user = storage.get(CURRENT_USER) || store?.state?.user
const isLogin = computed(() => Boolean(user?.oauth))
const loading = ref(false)
const disabled = ref(false)

const content = ref('')

const router = useRouter()

const save = () => {
  if (!content.value) {
    message.error('请输入反馈内容')
    return
  }
  loading.value = true
  createFeedback({
    content: content.value
  })
    .then(() => {
      message.success('提交成功')
      disabled.value = true
      setTimeout(() => {
        router.back()
      })
    })
    .finally(() => {
      loading.value = false
    })
}

onUnmounted(() => {
  disabled.value = false
})
</script>

<style lang="sass" scoped></style>
