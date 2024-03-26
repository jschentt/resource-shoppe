import { RouteRecordRaw } from 'vue-router'

/**
 * 登录相关页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      noNeedLogin: true
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      noNeedLogin: true
    },
    component: () => import(/* webpackChunkName: "register" */ '@/views/auth/register/index.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    meta: {
      noNeedLogin: true
    },
    component: () => import(/* webpackChunkName: "forget" */ '@/views/auth/forget/index.vue')
  },
  {
    path: '/setpwd',
    name: 'setpwd',
    meta: {
      noNeedLogin: true
    },
    component: () => import(/* webpackChunkName: "setpwd" */ '@/views/auth/setpwd/index.vue')
  }
]

export default routes
