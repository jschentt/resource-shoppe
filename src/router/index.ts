import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'
import { createRouterGuards } from './router-guards'
import 'nprogress/nprogress.css' // 进度条样式
import { errorRoutes } from './modules/error'
import iframes from './modules/iframes'
import resource from './modules/resource'
import login from './modules/login'

const SINGLE_PAGE = [errorRoutes, ...iframes]
const LAYOUT_PAGE = [...resource, ...login]

export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/resource',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页'
    },
    children: [...LAYOUT_PAGE]
  },
  ...SINGLE_PAGE
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
