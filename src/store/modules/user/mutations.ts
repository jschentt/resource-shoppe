import { MutationTree } from 'vuex'
import { State } from './state'
import { storage } from '@/libs/Storage'
import { CURRENT_USER } from '@/store/mutation-types'

export enum MutationType {
  SetUserPoints = 'SET_USER_POINTS',
  SetUserToken = 'SET_USER_TOKEN',
  SetUserInfo = 'SET_USER_INFO',
  SetUserToLocal = 'SAVE_USER_TO_LOCAL'
}

export enum UserState {
  Points = 'points',
  Oauth = 'oauth',
  UserData = 'userData'
}

export type Mutations<S = State> = {
  [MutationType.SetUserPoints](state: S, payload: number): void
  [MutationType.SetUserToken](state: S, payload: string): void
  [MutationType.SetUserInfo](state: S, payload: object): void
}

const saveUserToLocal = (state) => {
  storage.set(CURRENT_USER, state, 7 * 24 * 60 * 60 * 1000)
}

const mapCacheToState = (state, field, payload, isCache = true) => {
  state[field] = payload

  if (!isCache) {
    return
  }
  const cacheUser = storage.get(CURRENT_USER)
  const safeState = cacheUser && JSON.stringify(cacheUser[field]) !== '{}' ? cacheUser : {}
  safeState[field] = payload
  saveUserToLocal(safeState)
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetUserPoints]: (state, payload) => {
    mapCacheToState(state, UserState.Points, payload, false)
  },
  [MutationType.SetUserToken]: (state, payload) => {
    mapCacheToState(state, UserState.Oauth, payload)
  },
  [MutationType.SetUserInfo]: (state, info) => {
    mapCacheToState(state, UserState.UserData, info)
  }
}
