import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import store, { RootState } from '@/store'
import { getOauthToken, getUserInfo, getUserPoints } from '@/api/auth'
import { LoginParams } from '@/interfaces/login'

export enum UserActionTypes {
  Logout = 'LOGOUT',
  GetUserPoints = 'GET_USER_POINTS',
  GetOauthTokenByPassword = 'GET_OAUTH_BY_PASSWORD',
  GetUserInfo = 'GET_USER_INFO'
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [UserActionTypes.GetOauthTokenByPassword](
    context: ActionAugments,
    payload: LoginParams
  ): Promise<any>
  [UserActionTypes.GetUserInfo](context: ActionAugments): Promise<any>
  [UserActionTypes.Logout](context: ActionAugments): Promise<any>
}

export const actions: ActionTree<State, RootState> & Actions = {
  // 密码登录-换取token
  async [UserActionTypes.GetOauthTokenByPassword]({ commit }, params) {
    try {
      const response = await getOauthToken({
        ...params
      })

      const { success, data } = response

      if (success) {
        commit(MutationType.SetUserToken, data)
        await store.dispatch(UserActionTypes.GetUserInfo)
      }

      return Promise.resolve(true)
    } catch (e) {
      return Promise.resolve(false)
    }
  },

  // 获取用户信息
  async [UserActionTypes.GetUserInfo]({ commit }) {
    try {
      const response = await getUserInfo()
      commit(MutationType.SetUserInfo, response)
      return Promise.resolve(response)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  // 获取用户金币
  async [UserActionTypes.GetUserPoints]({ commit }) {
    try {
      const response = await getUserPoints()
      commit(MutationType.SetUserPoints, response?.points)
      return Promise.resolve(response)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  // 登出
  async [UserActionTypes.Logout]({ commit }) {
    commit(MutationType.SetUserToken, '')
    commit(MutationType.SetUserPoints, 0)
    commit(MutationType.SetUserInfo, {})
    localStorage.removeItem('CURRENT-USER')
    return Promise.resolve(true)
  }
}
