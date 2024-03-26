<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="state.rules"
      @submit="submit"
      @submit.prevent
      status-icon
      label-position="top"
      class="form-container mt-[48px]"
    >
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email" size="large" placeholder="请输入邮箱地址" disabled />
      </el-form-item>
      <el-form-item prop="newPassword" label="设置密码">
        <el-input
          v-model="ruleForm.newPassword"
          size="large"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认密码">
        <el-input
          v-model="ruleForm.confirmPassword"
          size="large"
          type="password"
          placeholder="请输入确认密码"
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
          >重设密码</el-button
        >
      </div>
      <div class="center my-[20px]">
        还没有账号? 去
        <el-button type="primary" link @click.stop="$router.push('/register')">注册 </el-button>
        <el-button type="primary" link @click.stop="$router.push('/resource/home')"
          >返回首页
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus'
import { message } from '@/libs'
import { forget, verifyHasSendEmail } from '@/api/auth'
import AES from '@/libs/secret'
import VerifyInterceptor from '@/components/verify-interceptor/index.vue'
import type { ForgetVerifyParams } from '@/interfaces/login'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const route = useRoute()

const result = ref()
const verifyRef = ref(null)

const ruleForm = reactive({
  email: '',
  verifyCode: '',
  newPassword: '',
  confirmPassword: ''
})

const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

const checkAccount = (_, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    return callback(new Error('请输入邮箱'))
  }
  if (value) {
    if (emailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱'))
    }
  }
}

const validatePassword = (_, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.confirmPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validateConfirmPassword = (_, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入确认密码'))
  } else if (value !== ruleForm.newPassword) {
    callback(new Error('密码输入不一致'))
  } else {
    callback()
  }
}

const state = reactive({
  loading: false,
  rules: {
    email: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: ['blur', 'change']
      },
      {
        validator: checkAccount,
        trigger: 'blur'
      }
    ],
    newPassword: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change']
      },
      {
        validator: validatePassword,
        trigger: 'blur'
      }
    ],
    confirmPassword: [
      {
        required: true,
        message: '请输入确认密码',
        trigger: ['blur', 'change']
      },
      {
        validator: validateConfirmPassword,
        trigger: 'blur'
      }
    ]
  }
} as any)

onMounted(() => {
  try {
    const decodeJson = JSON.parse(AES.DecodeBase64(route.query.token))
    verifyHasSendEmail({ ...decodeJson })
      .then(() => {
        ruleForm.email = decodeJson.email
        ruleForm.verifyCode = decodeJson.verifyCode
      })
      .catch(() => {
        router.push('/forget')
      })
  } catch (err) {
    message.error('参数解析失败')
    router.push('/forget')
  }
})

const submit = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return

    const { email, verifyCode, newPassword, confirmPassword } = ruleForm

    if (!emailReg.test(email)) {
      message.error('请输入正确的邮箱')
      return
    }

    const params = {
      email,
      verifyCode,
      newPassword: AES.Encrypt(newPassword),
      confirmPassword: AES.Encrypt(confirmPassword)
    } as ForgetVerifyParams

    const verifyRefCode = verifyRef.value.getResult()

    if (!result.value) {
      message.error('请输入计算结果')
      return
    }

    if (Number(result.value) !== verifyRefCode) {
      message.error('计算结果错误')
      return
    }

    state.loading = true
    forget(params)
      .then(() => {
        message.success('密码修改成功')
        router.replace({
          path: '/login'
        })
      })
      .finally(() => {
        state.loading = false
      })
  })
}
</script>

<style lang="scss" scoped>
@import '../login/style.scss';
</style>
