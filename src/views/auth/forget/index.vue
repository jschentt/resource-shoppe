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
          >找回密码</el-button
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
import { verifyHasSendEmail, verifyForgetEmail } from '@/api/auth'
import AES from '@/libs/secret'
import VerifyInterceptor from '@/components/verify-interceptor/index.vue'
import type { EmailVerifyParams } from '@/interfaces/login'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const verifyLoading = ref(false)

const result = ref()
const verifyRef = ref(null)

const ruleForm = reactive({
  username: '',
  verifyCode: ''
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
    ]
  }
} as any)

// 获取验证码频率验证
const verifyEmail = () => {
  const verifyTime = Number(localStorage.getItem('forget-pass-verify-email-timestamp'))
  const retryTimes = Number(localStorage.getItem('forget-pass-verify-email-times'))

  const currentTime = Date.now()

  if (!verifyTime) {
    localStorage.setItem('forget-pass-verify-email-timestamp', String(Date.now()))
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
    localStorage.setItem('forget-pass-verify-email-times', '0')
  }

  return true
}

// 重置验证缓存
const setVerifyCache = () => {
  let retryTimes = Number(localStorage.getItem('forget-pass-verify-email-times'))
  localStorage.setItem('forget-pass-verify-email-times', String(++retryTimes))
  localStorage.setItem('forget-pass-verify-email-timestamp', String(Date.now()))
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
  verifyForgetEmail({
    email: ruleForm.username
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

    const { username, verifyCode } = ruleForm

    if (!emailReg.test(username)) {
      message.error('请输入正确的邮箱')
      return
    }

    const params = {
      email: username.toLowerCase(),
      verifyCode
    } as EmailVerifyParams

    const verifyRefCode = verifyRef.value.getResult()

    if (!result.value) {
      message.error('请输入计算结果')
      return
    }

    if (Number(result.value) !== verifyRefCode) {
      message.error('计算结果错误')
      return
    }

    const extraParams = AES.EncodeBase64(JSON.stringify(params))

    state.loading = true
    verifyHasSendEmail(params)
      .then(() => {
        router.push(`/setpwd?token=${extraParams}`)
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
