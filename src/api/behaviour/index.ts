import http from '@/libs/http/axios'
import type { CreateBehaviourParams, SearchBehaviourParams } from '@/interfaces/behaviour'

enum Api {
  // 商品收藏
  favoriteGood = '/v1/web/auth/good/favorite',
  // 商品点赞
  likeGood = '/v1/web/auth/good/like',
  // 商品分享
  shareGood = '/v1/web/auth/good/share',
  // 取消商品收藏
  unFavoriteGood = '/v1/web/auth/good/unfavorite',
  // 取消商品点赞
  unlikeGood = '/v1/web/auth/good/unlike',
  // 获取用户商品收藏列表
  fetchFavoriteGoodList = '/v1/web/auth/good/favorite/list',
  // 获取用户商品点赞列表
  fetchLikeGoodList = '/v1/web/auth/good/like/list',
  // 获取用户商品分享列表
  fetchShareGoodList = '/v1/web/auth/good/share/list',
  // 用户是否收藏商品
  fetchHasfavoriteGood = '/v1/web/auth/good/hasfavorite',
  // 用户是否点赞商品
  fetchHaslikeGood = '/v1/web/auth/good/haslike',
  // 用户是否分享商品
  fetchHasshareGood = '/v1/web/auth/good/hasshare',
  // 获取用户收藏总数
  fetchUserFavoriteGoodCount = '/v1/web/auth/user/favorite/count',
  // 获取用户点赞总数
  fetchUserLikeGoodCount = '/v1/web/auth/user/like/count',
  // 获取用户分享总数
  fetchUserShareGoodCount = '/v1/web/auth/user/share/count',
  // 获取商品收藏/点赞/分享汇总
  fetchGoodBehaviourTotal = '/v1/web/auth/good/behaviour',
  // 用户是否收藏/分享/点赞商品汇总
  fetchUserHasBehaviourGood = '/v1/web/auth/user/behaviour',
  // 获取用户收藏/点赞/分享商品总数汇总
  fetchUserBehaviourGoodTotal = '/v1/web/auth/user/good/total'
}

/**
 * description: 商品收藏
 */
export function favoriteGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: Api.favoriteGood,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 商品点赞
 */
export function likeGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: Api.likeGood,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 商品分享
 */
export function shareGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: Api.shareGood,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 取消商品收藏
 */
export function unFavoriteGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: Api.unFavoriteGood,
      method: 'PUT',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 取消商品点赞
 */
export function unlikeGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: Api.unlikeGood,
      method: 'PUT',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户商品收藏列表
 */
export function fetchFavoriteGoodList(params: SearchBehaviourParams) {
  return http.request(
    {
      url: Api.fetchFavoriteGoodList,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取商品收藏总数
 */
export function fetchFavoriteGoodCount(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.favoriteGood}/${params.goodId}/count`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户商品点赞列表
 */
export function fetchLikeGoodList(params: SearchBehaviourParams) {
  return http.request(
    {
      url: Api.fetchLikeGoodList,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取商品点赞总数
 */
export function fetchLikeGoodCount(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.likeGood}/${params.goodId}/count`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户商品分享列表
 */
export function fetchShareGoodList(params: SearchBehaviourParams) {
  return http.request(
    {
      url: Api.fetchShareGoodList,
      method: 'GET',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取商品分享总数
 */
export function fetchShareGoodCount(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.shareGood}/${params.goodId}/count`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 用户是否收藏商品
 */
export function fetchHasfavoriteGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.fetchHasfavoriteGood}/${params.goodId}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 用户是否点赞商品
 */
export function fetchHaslikeGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.fetchHaslikeGood}/${params.goodId}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 用户是否分享商品
 */
export function fetchHasshareGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.fetchHasshareGood}/${params.goodId}`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户收藏总数
 */
export function fetchUserFavoriteGoodCount() {
  return http.request(
    {
      url: Api.fetchUserFavoriteGoodCount,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户点赞总数
 */
export function fetchUserLikeGoodCount() {
  return http.request(
    {
      url: Api.fetchUserLikeGoodCount,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户分享总数
 */
export function fetchUserShareGoodCount() {
  return http.request(
    {
      url: Api.fetchUserShareGoodCount,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取商品收藏/点赞/分享汇总
 */
export function fetchGoodBehaviourTotal(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.fetchGoodBehaviourTotal}/${params.goodId}/total`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 用户是否收藏/分享/点赞商品汇总
 */
export function fetchUserHasBehaviourGood(params: CreateBehaviourParams) {
  return http.request(
    {
      url: `${Api.fetchUserHasBehaviourGood}/${params.goodId}/total`,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 获取用户收藏/点赞/分享商品总数汇总
 */
export function fetchUserBehaviourGoodTotal() {
  return http.request(
    {
      url: Api.fetchUserBehaviourGoodTotal,
      method: 'GET'
    },
    {
      isShowErrorMessage: true
    }
  )
}
