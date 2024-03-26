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
      <el-form-item prop="username" label="电子邮箱">
        <el-input v-model="ruleForm.username" size="large" placeholder="请输入邮箱地址">
          <template #append>
            <el-button type="primary" @click="getVerifyCode" :loading="verifyLoading">
              获取验证码
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode" label="邮箱验证码">
        <el-input v-model="ruleForm.verifyCode" size="large" placeholder="请输入邮箱验证码" />
      </el-form-item>
      <el-form-item prop="password" label="设置密码">
        <el-input
          v-model="ruleForm.password"
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
          >立即注册</el-button
        >
      </div>
      <div class="center my-[20px]">
        已经有账号了? 去
        <el-button type="primary" link @click.stop="$router.push('/login')">登录 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus'
import { message } from '@/libs'
import { register, verifyRegisterEmail } from '@/api/auth'
import AES from '@/libs/secret'
import VerifyInterceptor from '@/components/verify-interceptor/index.vue'
import type { RegisterParams } from '@/interfaces/login'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const verifyLoading = ref(false)

const result = ref()
const verifyRef = ref(null)

const ruleForm = reactive({
  username: '',
  password: '',
  verifyCode: '',
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
  } else if (value !== ruleForm.password) {
    callback(new Error('密码输入不一致'))
  } else {
    callback()
  }
}

const state = reactive({
  loading: false,
  rules: {
    username: [
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
    verifyCode: [
      {
        required: true,
        message: '请输入邮箱验证码',
        trigger: ['blur', 'change']
      }
    ],
    password: [
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

// 获取验证码频率验证
const verifyEmail = () => {
  const verifyTime = Number(localStorage.getItem('register-pass-verify-email-timestamp'))
  const retryTimes = Number(localStorage.getItem('register-pass-verify-email-times'))

  const currentTime = Date.now()

  if (!verifyTime) {
    localStorage.setItem('register-pass-verify-email-timestamp', String(Date.now()))
    return true
  }

  // 3分钟内超过3次，禁止发送邮件
  const threshold = 3 * 60 * 1000

  // retryTimes 从0开始计算（0，1，2）
  if (currentTime - verifyTime < threshold) {
    if (retryTimes >= 3) {
      return false
    }
  } else {
    // 3分钟外重新计算次数
    localStorage.setItem('register-pass-verify-email-times', '0')
  }

  return true
}

// 重置验证缓存
const setVerifyCache = () => {
  let retryTimes = Number(localStorage.getItem('register-pass-verify-email-times'))
  localStorage.setItem('register-pass-verify-email-times', String(++retryTimes))
  localStorage.setItem('register-pass-verify-email-timestamp', String(Date.now()))
}

const getVerifyCode = async () => {
  const validEmail = verifyEmail()
  if (!validEmail) {
    message.error('验证码获取频繁，请稍后再试')
    return
  }

  const valid = await ruleFormRef.value.validateField('username')
  if (!valid) {
    return
  }

  verifyLoading.value = true
  verifyRegisterEmail({
    email: ruleForm.username.toLowerCase()
  })
    .then(() => {
      setVerifyCache()
      message.success('验证码发送成功，请查收邮件')
    })
    .finally(() => {
      verifyLoading.value = false
    })
}

const submit = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return

    const { username, verifyCode, password, confirmPassword } = ruleForm

    if (!emailReg.test(username)) {
      message.error('请输入正确的邮箱')
      return
    }

    const params = {
      account: username,
      email: username,
      verifyCode,
      password: AES.Encrypt(password),
      confirmPassword: AES.Encrypt(confirmPassword)
    } as RegisterParams

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
    register(params)
      .then(() => {
        message.success('注册成功')
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
