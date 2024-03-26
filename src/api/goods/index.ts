import http from '@/libs/http/axios'
import type { SearchGoodsParams, SearchGoodsByTagParams } from '@/interfaces/goods'

enum Api {
  // 获取所有商品分类列表
  allGoodCategory = '/v1/web/open/good_category/alllist',
  // 根据分类ID获取商品列表
  goodListByCategoryId = '/v1/web/open/goods/category/list',
  // 根据标签CODE获取商品列表
  goodListByTagId = '/v1/web/open/goods/tag/list',
  // 根据推广者账号获取商品列表
  goodListByPromotionId = '/v1/web/open/goods/promotion/list',
  // 根据类型获取商品列表
  goodListByType = '/v1/web/open/goods/type/list',
  // 获取所有分类商品列表
  categoryAllGoods = '/v1/web/open/goods/category/alllist',
  // 获取所有标签商品列表
  tagAllGoods = '/v1/web/open/goods/tag/alllist',
  // 获取商品详情
  goodDetail = '/v1/web/open/goods'
}

/**
 * description: 获取商品分类列表
 */
export function fetchAllGoodCategory() {
  return http.request(
    {
      url: Api.allGoodCategory,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 根据分类ID获取商品列表
 */
export function fetchGoodListByCategoryId(params: SearchGoodsParams, id: number) {
  return http.request(
    {
      url: `${Api.goodListByCategoryId}/${id}`,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 根据标签CODE获取商品列表
 */
export function fetchGoodListByTagId(params: SearchGoodsByTagParams, id: number) {
  return http.request(
    {
      url: `${Api.goodListByTagId}/${id}`,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 根据推广者账号获取商品列表
 */
export function fetchGoodListByPromotionId(params: SearchGoodsParams, account: string) {
  return http.request(
    {
      url: `${Api.goodListByPromotionId}/${account}`,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 根据类型获取商品列表
 */
export function fetchGoodListByType(params: SearchGoodsParams) {
  return http.request(
    {
      url: Api.goodListByType,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取所有分类商品列表
 */
export function fetchCategoryAllGoods() {
  return http.request(
    {
      url: Api.categoryAllGoods,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取所有标签商品列表
 */
export function fetchTagAllGoods() {
  return http.request(
    {
      url: Api.tagAllGoods,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取商品详情
 */
export function fetchGoodDetail(id: number) {
  return http.request(
    {
      url: `${Api.goodDetail}/${id}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}
