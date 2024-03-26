import { createStore, createLogger } from 'vuex'
import { App } from 'vue'
import { store as user, UserStore, State as UserState } from '@/store/modules/user'

export type RootState = {
  user: UserState
}

export type Store = UserStore<Pick<RootState, 'user'>>

// 在开发环境中开启logger
const debug = import.meta.env.VITE_APP_ENV_NAME !== 'production'

const plugins = debug ? [createLogger({})] : []
// 可以根据自己需要添加其他插件，例如：vuex持久化插件
// plugins.push(createPersistedState({ storage: window.sessionStorage }));

const store = createStore<RootState>({
  plugins,
  modules: {
    user
  }
})

// 定义你自己的“useStore”组合函数
export function useStore(): Store {
  return store as Store
}

export function setupStore(app: App) {
  app.use(store)
}

export default store
