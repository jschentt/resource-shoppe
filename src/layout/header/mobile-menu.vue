<template>
  <div v-bind="$attrs">
    <span @click="close">
      <slot></slot>
    </span>

    <div>
      <el-drawer
        direction="ltr"
        :modelValue="visible"
        :show-close="false"
        :with-header="false"
        size="285px"
      >
        <div class="header">
          <el-row :gutter="8">
            <el-col :span="6">
              <el-avatar :src="state.avatar" :size="48">{{ state.username }}</el-avatar>
            </el-col>
            <el-col :span="15" :offset="1">
              <h4>{{ loginText }}</h4>
              <div class="login">
                <template v-if="!isLogin">
                  <span @click="login">登录</span>
                  <span @click="register" class="ml-[15px]">注册</span>
                </template>
                <div class="user-center">
                  <span @click="jumpToUserCenter" v-show="isLogin">个人中心</span>
                  <span @click="logout" v-show="isLogin" class="ml-[10px]">退出登录</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <slot name="menu"></slot>
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { modal } from '@/libs'
import useGlobalConfig from '@/hooks/useGlobalConfig'
import { UserActionTypes } from '@/store/modules/user/actions'
import { defaultNoImg, defaultAuthImg } from './const'

const store = useStore()
const { isLogin: isUserLogin, user } = useGlobalConfig()

const isLogin = ref(false)
const loginText = ref(isUserLogin.value ? '欢迎来到资源小站～' : '您还没有登录哦~')

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['visible-change'])

const state = reactive({
  username: user?.userData?.name,
  avatar: user?.userData?.avatar
})

const route = useRoute()
const router = useRouter()

// 监听路由，实时改变页面状态
watch(
  () => route.path,
  () => {
    isLogin.value = isUserLogin.value
    loginText.value = isUserLogin.value ? '欢迎来到资源小站～' : '您还没有登录哦~'
    state.username = user?.userData?.name
    state.avatar = user?.userData?.avatar || (isLogin.value ? defaultAuthImg : defaultNoImg)
  },
  { immediate: true }
)

// 关闭抽屉面板
const close = () => {
  emit('visible-change')
}

// 跳转个人中心
const jumpToUserCenter = () => {
  close()
  router.push('/resource/user-center')
}

// 跳转注册页
const register = () => {
  close()
  router.push('/register')
}

// 跳转登录页
const login = () => {
  close()
  router.push('/login')
}

// 退出登录
const logout = () => {
  modal.warning(
    '您确定要退出登录吗？',
    '',
    () => {
      store.dispatch(UserActionTypes.Logout).then((res) => {
        if (res) {
          close()
          router
            .replace({
              name: 'login',
              query: {
                redirect: route.fullPath
              }
            })
            .finally(() => window.location.reload())
        }
      })
    },
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  )
}
</script>

<style lang="scss" scoped>
.header {
  font-size: 16px;
  .login {
    margin-top: -5px;
    span {
      color: rgb(119, 119, 119);
    }
  }
}
::v-deep(.el-menu-item) {
  font-size: 16px !important;
}
</style>
