/**
 * 商品查询参数
 */
export interface SearchGoodsParams {
  /**
   * 商品类型
   */
  type?: number
  /**
   * 商品名称
   */
  name?: string
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 每页显示条数
   */
  pageSize: number
}

export interface SearchGoodsByTagParams {
  /**
   * 浏览量
   */
  scanSort?: 'ASC' | 'DESC'
  /**
   * 点赞
   */
  likeSort?: 'ASC' | 'DESC'
  /**
   * 收藏
   */
  favoriteSort?: 'ASC' | 'DESC'
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 每页显示条数
   */
  pageSize: number
}

/**
 * 商品详情
 */
export interface GoodDetailInfo {
  /**
   * 商品简介
   */
  comment: string
  /**
   * 商品分类ID
   */
  goodCategoryId: number
  /**
   * 商品分类名称
   */
  goodCategoryName: string
  /**
   * 主键ID
   */
  id: number
  /**
   * 是否允许积分支付
   */
  isPoints: number
  /**
   * 商品是否置顶
   */
  istop: number
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品图片列表
   */
  pictures: string[]
  /**
   * 商品积分
   */
  points: number
  /**
   * 商品价格
   */
  price: number
  /**
   * 商品销量
   */
  saleCount: number
  /**
   * 商品库存
   */
  stock: number
}
