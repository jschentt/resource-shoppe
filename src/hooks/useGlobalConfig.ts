import { CURRENT_USER } from '@/store/mutation-types'
import { storage } from '@/libs/Storage'

export default function useGlobalConfig() {
  const store = useStore()
  const user = storage.get(CURRENT_USER) || store?.state?.user
  const isLogin = computed(() => Boolean(user?.oauth))

  // 全局静态配置
  const pagination = {
    current: 1,
    pageSize: 12,
    total: 0
  }

  // 用户信息
  const userinfo = {
    isLogin,
    user,
    cacheUser: storage.get(CURRENT_USER),
    storeUser: store?.state?.user
  }

  return {
    ...pagination,
    ...userinfo
  }
}
