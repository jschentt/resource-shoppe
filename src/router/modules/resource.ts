import { RouteRecordRaw } from 'vue-router'
import { markRaw } from 'vue'
import { RouterTransition } from '@/components/transition'

const routeName = 'resource'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/resource',
    name: routeName,
    redirect: '/resource/home',
    component: markRaw(RouterTransition),
    meta: {
      title: '资源管理'
    },
    children: [
      {
        path: 'home',
        name: `${routeName}-home`,
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'user-center',
        name: `${routeName}-user-center`,
        meta: {
          title: '用户中心',
          keepAlive: true
        },
        component: () => import('@/views/user-center/index.vue')
      },
      {
        path: 'view-order',
        name: `${routeName}-view-order`,
        meta: {
          title: '查看订单',
          keepAlive: true
        },
        component: () => import('@/views/order-manage/open-order/index.vue')
      },
      {
        path: 'feedback',
        name: `${routeName}-feedback`,
        meta: {
          title: '反馈',
          keepAlive: true
        },
        component: () => import('@/views/feedback/index.vue')
      },
      {
        path: 'good-detail/:id',
        name: `${routeName}-good-detail`,
        meta: {
          title: '商品详情',
          keepAlive: true
        },
        component: () => import('@/views/good-manage/good-detail/index.vue')
      },
      {
        path: 'goods-category/:name/:id',
        name: `${routeName}-goods-category`,
        meta: {
          title: '商品分类',
          keepAlive: true
        },
        component: () => import('@/views/good-manage/goods-category/index.vue')
      },
      {
        path: 'goods-tag/:name/:id',
        name: `${routeName}-goods-tag`,
        meta: {
          title: '商品标签',
          keepAlive: true
        },
        component: () => import('@/views/good-manage/goods-tag/index.vue')
      },
      {
        path: 'promotion/goods/:name',
        name: `${routeName}-goods-promotion`,
        meta: {
          title: '商品分类',
          keepAlive: true
        },
        component: () => import('@/views/good-manage/goods-promotion/index.vue')
      },
      {
        path: 'order-detail/:orderNo',
        name: `${routeName}-order-detail`,
        meta: {
          title: '订单详情',
          keepAlive: true
        },
        component: () => import('@/views/order-manage/order-detail/index.vue')
      },
      {
        path: 'order-list',
        name: `${routeName}-order-list`,
        meta: {
          title: '订单列表',
          keepAlive: true
        },
        component: () => import('@/views/order-manage/auth-order/index.vue')
      }
    ]
  },
  {
    path: '/redirect/:path*',
    name: 'Redirect',
    component: markRaw(RouterTransition),
    meta: {
      title: '重定向',
      icon: 'SettingOutlined',
      hidden: true
    },
    children: [
      {
        path: '',
        name: 'Redirect',
        component: import('@/views/shared/redirect/index'),
        meta: {
          title: '重定向',
          hidden: true,
          keepAlive: false
        }
      }
    ]
  }
]

export default routes
