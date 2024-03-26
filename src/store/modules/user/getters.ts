import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  oauth(state: State): string
  points(state: State): number
  userData(state: State): object
}

export const getters: GetterTree<State, RootState> & Getters = {
  points: (state) => state.points,
  oauth: (state) => state.oauth,
  userData: (state) => state.userData
}
