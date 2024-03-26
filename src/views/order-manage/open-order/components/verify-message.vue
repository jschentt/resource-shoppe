<template>
  <div>
    <verify-order-list v-if="isSearch" :email="state.formInline.email" />
    <div class="container" v-else>
      <div>接收邮箱</div>
      <el-form ref="payFormRef" :model="state.formInline" :rules="state.rules" label-position="top">
        <el-form-item prop="email">
          <div class="mt-[15px]" style="width: 100%">
            <el-input
              placeholder="下单时填写的邮箱"
              size="large"
              v-model="state.formInline.email"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div class="mt-[20px]">
        <el-button type="primary" @click="onSearch" :loading="state.loading">查找订单</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import VerifyOrderList from './order-message/verify-order-list.vue'

const isSearch = ref(false)
const payFormRef = ref<FormInstance>()

const checkEmail = (_, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    return callback(new Error('请输入邮箱地址'))
  }
  const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (value) {
    if (emailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱地址'))
    }
  }
}

const state = reactive({
  loading: false,
  formInline: {
    email: ''
  },
  rules: {
    email: [
      {
        required: true,
        message: '请输入邮箱地址',
        trigger: ['blur', 'change']
      },
      {
        validator: checkEmail,
        trigger: 'blur'
      }
    ]
  }
} as any)

const onSearch = () => {
  payFormRef.value.validate((valid) => {
    if (!valid) return
    isSearch.value = true
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
}
</style>
