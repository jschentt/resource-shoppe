import { RouteRecordRaw } from 'vue-router'

/**
 * 内嵌相关页面（确认支付页）
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/resource/confirm-pay',
    name: 'resource-confirm-pay',
    meta: {
      title: '确认支付'
    },
    component: () => import('@/views/order-manage/confirm-pay/index.vue')
  }
]

export default routes
