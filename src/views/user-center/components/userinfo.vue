<template>
  <div class="container">
    <el-form
      label-width="80px"
      ref="ruleFormRef"
      :model="userinfo"
      :rules="rules"
      @submit="submit"
      @submit.prevent
      class="layout-form"
    >
      <el-form-item prop="account" label="账号">
        <el-input v-model="userinfo.account" placeholder="请输入账号" maxlength="40" />
      </el-form-item>
      <el-form-item prop="name" label="昵称">
        <el-input v-model="userinfo.name" placeholder="请输入昵称" maxlength="20" />
      </el-form-item>
      <el-form-item prop="comment" label="签名">
        <el-input
          v-model="userinfo.comment"
          type="textarea"
          placeholder="请输入签名"
          :rows="2"
          maxlength="500"
        />
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="userinfo.sex" label="label position">
          <el-radio-button :label="1">男</el-radio-button>
          <el-radio-button :label="2">女</el-radio-button>
          <el-radio-button :label="3">其他</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="custom-date-picker">
        <el-form-item prop="birth" label="生日">
          <el-date-picker
            v-model="userinfo.birth"
            type="date"
            placeholder="选择日期"
            popper-class="custom-date"
          />
        </el-form-item>
      </div>
      <el-form-item prop="address" label="地址">
        <el-input v-model="userinfo.address" placeholder="请输入地址" maxlength="150" />
      </el-form-item>
      <el-form-item prop="mobile" label="电话号码">
        <el-input v-model="userinfo.mobile" placeholder="请输入电话号码" maxlength="11" />
      </el-form-item>
      <el-form-item prop="email" label="电子邮箱">
        <el-input v-model="userinfo.email" placeholder="请输入电子邮箱" maxlength="40" />
      </el-form-item>
      <el-form-item prop="promotionId" label="微信号">
        <el-input v-model="userinfo.promotionId" placeholder="请输入微信号" maxlength="50" />
      </el-form-item>
      <el-form-item prop="createTime" label="注册时间">
        <span>{{ dayjs(userinfo.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </el-form-item>
      <el-form-item prop="createTime" label="最后登录">
        <span>{{ dayjs(userinfo.lastLoginTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </el-form-item>
      <div>
        <el-button
          type="primary"
          :loading="loading"
          size="large"
          class="my-[20px]"
          native-type="submit"
          >提交</el-button
        >
        <el-button size="large" @click="$router.back()">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { pick } from 'lodash-es'
import type { FormInstance } from 'element-plus'
import { getUserInfo, updateUserInfo } from '@/api/auth'
import { message } from '@/libs'
import type { EditUserParams } from '@/interfaces/login'

const ruleFormRef = ref<FormInstance>()

const loading = ref(false)

const userinfo = ref({
  account: '',
  name: '',
  sex: undefined,
  birth: '',
  address: '',
  email: '',
  mobile: '',
  avatar: '',
  comment: '',
  createTime: '',
  lastLoginTime: '',
  promotionId: ''
})

const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
const mobileReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

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

const checkMobile = (_, value: string, callback: (error?: Error) => void) => {
  if (value) {
    if (mobileReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的电话号码'))
    }
  }
}

const rules = reactive({
  account: [
    {
      required: true,
      message: '账号不能为空',
      trigger: ['blur', 'change']
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: ['blur', 'change']
    },
    {
      validator: checkAccount,
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      validator: checkMobile,
      trigger: 'blur'
    }
  ]
} as any)

const submit = async () => {
  if (!ruleFormRef.value) return
  const valid = await ruleFormRef.value.validate()

  if (!valid) return

  try {
    loading.value = true
    await updateUserInfo({
      ...pick(userinfo.value, [
        'id',
        'account',
        'name',
        'sex',
        'address',
        'birth',
        'promotionId',
        'mobile',
        'email',
        'avatar',
        'comment'
      ])
    } as EditUserParams)
    message.success('保存成功')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  ;(async () => {
    const res = await getUserInfo()
    userinfo.value = res
  })()
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  text-align: center;

  .layout-form {
    max-width: 460px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 374px) {
  .custom-date-picker {
    display: none;
  }
}
</style>
