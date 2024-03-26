<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="state.formInline"
      :rules="state.rules"
      @submit="doLogin"
      @submit.prevent
      label-position="top"
      class="form-container mt-[48px]"
    >
      <el-form-item prop="username" label="账号">
        <el-input
          v-model="state.formInline.username"
          size="large"
          placeholder="请输入账号/邮箱/手机号"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="state.formInline.password"
          size="large"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        />
      </el-form-item>
      <div>
        <verify-interceptor v-model="result" ref="verifyRef" />
      </div>
      <div>
        <el-button
          type="primary"
          native-type="submit"
          size="large"
          :loading="state.loading"
          class="w-[100%]"
          >立即登录</el-button
        >
      </div>

      <div class="center my-[20px]">
        还没有账号? 去
        <el-button type="primary" link @click.stop="$router.push('/register')">注册 </el-button>
        <el-button type="primary" link @click.stop="$router.push('/forget')" class="ml-[5px]"
          >忘记密码？</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { UserActionTypes } from '@/store/modules/user/actions'
import VerifyInterceptor from '@/components/verify-interceptor/index.vue'
import AES from '@/libs/secret'
import { message } from '@/libs'

const store = useStore()

const result = ref()
const verifyRef = ref(null)

const state = reactive({
  loading: false,
  formInline: {
    username: '',
    password: ''
  },
  rules: {
    username: [
      {
        required: true,
        message: '请输入用户账号',
        trigger: ['blur', 'change']
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change']
      }
    ]
  }
})

const ruleFormRef = ref<FormInstance>()
const route = useRoute()
const router = useRouter()

const doLogin = async () => {
  if (!ruleFormRef.value) return
  const valid = await ruleFormRef.value.validate()
  if (!valid) return

  const { username, password } = state.formInline

  const verifyCode = verifyRef.value.getResult()

  if (!result.value) {
    message.error('请输入计算结果')
    return
  }

  if (Number(result.value) !== verifyCode) {
    message.error('计算结果错误')
    return
  }

  try {
    state.loading = true

    const params = {
      username,
      password: AES.Encrypt(password)
    }

    const isSuccess = await store.dispatch(UserActionTypes.GetOauthTokenByPassword, params)

    if (!isSuccess) {
      return
    }

    const { query } = route
    router.replace({
      path: <string>query?.redirect ?? '/'
    })
  } finally {
    state.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
