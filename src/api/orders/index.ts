import http from '@/libs/http/axios'
import type { CreateOrderParams, SearchOrdersParams } from '@/interfaces/order'

enum Api {
  // 授权用户创建订单
  createAuthOrder = '/v1/web/auth/order',
  // 开放用户创建订单
  createOpenOrder = '/v1/web/open/order',
  // 获取授权用户订单列表
  orderList = '/v1/web/auth/order/list',
  // 根据邮箱获取开放用户订单列表
  orderEmailList = '/v1/web/open/order/list',
  // 获取授权用户订单详情
  orderAuthDetail = '/v1/web/auth/order',
  // 获取开放用户订单详情
  orderOpenDetail = '/v1/web/open/order',
  // 查询订单支付状态
  queryPayOrderStatus = '/v1/web/open/order-status'
}

/**
 * description: 授权用户创建订单
 */
export function createAuthOrder(params: CreateOrderParams) {
  return http.request(
    {
      url: Api.createAuthOrder,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 开放用户创建订单
 */
export function createOpenOrder(params: CreateOrderParams) {
  return http.request(
    {
      url: Api.createOpenOrder,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取订单列表
 */
export function fetchOrderList(params: SearchOrdersParams) {
  return http.request(
    {
      url: Api.orderList,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 根据邮箱获取订单列表
 */
export function fetchEmailOrderList(params: SearchOrdersParams) {
  return http.request(
    {
      url: Api.orderEmailList,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取授权用户订单详情
 */
export function fetchAuthOrderDetail(orderNo: string) {
  return http.request(
    {
      url: `${Api.orderAuthDetail}/${orderNo}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: false,
      isTransformRequestResult: false
    }
  )
}

/**
 * description: 获取开放用户订单详情
 */
export function fetchOpenOrderDetail(orderNo: string) {
  return http.request(
    {
      url: `${Api.orderOpenDetail}/${orderNo}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: false,
      isTransformRequestResult: false
    }
  )
}

/**
 * description: 查询订单支付状态
 */
export function fetchOpenPayOrderDetail(orderNo: string) {
  return http.request(
    {
      url: `${Api.queryPayOrderStatus}/${orderNo}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: false,
      isTransformRequestResult: false
    }
  )
}
