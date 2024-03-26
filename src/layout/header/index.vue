<template>
  <el-header class="layout-header">
    <div class="layout-header-container">
      <div class="layout-header-content">
        <div class="left-options">
          <logo :collapsed="false" />
        </div>
        <div class="right-options">
          <el-menu
            mode="horizontal"
            :ellipsis="false"
            :default-active="String(route.name)"
            @select="switchTabs"
            class="pc-header"
          >
            <template v-for="{ name, key } in menus" :key="key">
              <el-menu-item :index="`resource-${key}`"> {{ name }}</el-menu-item>
            </template>
          </el-menu>
          <span class="mr-[10px]" v-if="isLogin">
            <span class="coin">
              <el-icon :style="iconStyle"><coin /></el-icon>
              {{ points }}金币
            </span>
          </span>
          <el-dropdown class="pc-header">
            <el-avatar :src="avatar" :size="34">{{ username }}</el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <a @click.prevent="$router.push('/resource/user-center')">
                    <span>个人中心</span>
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a @click.prevent="toggleLogin">
                    <el-icon :style="iconStyle"><switch-button /></el-icon>
                    <span>{{ loginText }}</span>
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <mobile-menu class="mobile-header" :visible="drawer" @visible-change="drawer = !drawer">
            <el-avatar :src="avatar" :size="34">{{ username }}</el-avatar>
            <template #menu>
              <div class="mt-[48px]">
                <el-menu
                  :ellipsis="false"
                  :default-active="String(route.name)"
                  @select="switchTabs"
                >
                  <template v-for="{ name, key } in mobileMenu" :key="key">
                    <div>
                      <el-menu-item :index="`resource-${key}`"> {{ name }}</el-menu-item>
                    </div>
                  </template>
                </el-menu>
              </div>
            </template>
          </mobile-menu>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script lang="ts">
import { isApp, isiOS, modal } from '@/libs'
import components from '@/layout/header/components'
import { UserActionTypes } from '@/store/modules/user/actions'
import { defaultNoImg, defaultAuthImg, downloadAppUrl } from './const'
import useGlobalConfig from '@/hooks/useGlobalConfig'

export default defineComponent({
  name: 'PageHeader',
  components: { ...components },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup() {
    const store = useStore()
    const { isLogin: isUserLogin, storeUser, user } = useGlobalConfig()
    const isLogin = ref(false)
    const loginText = ref(isUserLogin.value ? '退出登录' : '登录')

    const state = reactive({
      drawer: false,
      menus: [
        {
          name: '网站首页',
          key: 'home'
        },
        {
          name: '查看订单',
          key: 'view-order'
        },
        {
          name: '我要反馈',
          key: 'feedback'
        },
        {
          name: 'App下载',
          key: 'app'
        }
      ],
      username: '',
      avatar: '',
      points: 0,
      iconStyle: {
        position: 'relative',
        top: '2px'
      }
    })

    const router = useRouter()
    const route = useRoute()

    const mobileMenu = computed(() => {
      return isiOS() || isApp() ? state.menus.filter((it) => it.key !== 'app') : state.menus
    })

    // 监听路由，实时改变页面状态
    watch(
      () => route.path,
      () => {
        isLogin.value = isUserLogin.value
        loginText.value = isUserLogin.value ? '退出登录' : '登录'
        state.username = user?.userData?.name
        state.avatar = user?.userData?.avatar || (isLogin.value ? defaultAuthImg : defaultNoImg)
      },
      { immediate: true }
    )

    // 监听是否登录，动态请求金币接口
    watch(
      () => isLogin.value,
      (isLogin) => {
        if (isLogin) {
          store.dispatch(UserActionTypes.GetUserPoints).then((res) => {
            state.points = res.points
          })
        }
      },
      { immediate: true }
    )

    // 监听金币修改
    watch(
      () => storeUser?.points,
      (newPoints) => {
        state.points = newPoints
      },
      { immediate: true }
    )

    // 退出登录
    const toggleLogin = () => {
      if (!isLogin.value) {
        router.push('/login')
        return
      }
      modal.warning(
        '您确定要退出登录吗？',
        '',
        () => {
          store.dispatch(UserActionTypes.Logout).then((res) => {
            if (res) {
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

    // 菜单路由切换
    const switchTabs = (key) => {
      state.drawer = false

      if (key === 'resource-app') {
        window.open(downloadAppUrl)
        return
      }
      router.push({
        name: key
      })
    }

    return {
      ...toRefs(state),
      toggleLogin,
      loginText,
      route,
      isLogin,
      switchTabs,
      mobileMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  width: 100%;
  height: $header-height;
  box-shadow: 0 -1px #0000001a;
  border-bottom: solid 1px #e5e5e5;

  .layout-header-container {
    width: 100%;
    max-width: 1190px;
    padding: 0 10px;
    height: 100%;

    .layout-header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
  @mixin flex-center {
    display: flex;
    align-items: center;
  }

  ::v-deep(.el-dropdown-link) {
    & > a {
      font-weight: 500;
    }
  }

  .icon-power {
    position: relative;
    top: 5px;
  }
  .left-options {
    @include flex-center;
    .menu-fold {
      @include flex-center;
      cursor: pointer;
    }
    .el-icon--right {
      position: relative;
      top: 2px;
    }
  }

  .right-options {
    display: flex;
    align-items: center;
    height: 100%;

    > * {
      cursor: pointer;
    }
  }

  ::v-deep(.el-menu) {
    margin-right: 25px;
    height: 100%;
    border-bottom: none;
    border-right: 0 !important;
  }

  ::v-deep(.el-menu-item) {
    color: #666;
  }

  .mobile-header {
    ::v-deep(.el-menu-item) {
      border-bottom: 1px solid #f3f3f3;
      padding: 32px 20px;
    }
  }

  ::v-deep(.el-avatar) {
    font-size: 12px;
    background-color: transparent;
  }
}

@media screen and (max-width: 768px) {
  .layout-header {
    height: 48px;
  }
  .mobile-header {
    display: block;
  }
  .pc-header {
    display: none;
  }
  .coin {
    font-size: 15px;
  }
}

@media screen and (min-width: 768px) {
  .mobile-header {
    display: none;
  }
  .pc-header {
    display: block;
  }

  .coin {
    font-size: 14px;
  }
}
</style>
