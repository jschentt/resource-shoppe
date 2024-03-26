import { USE_POINTS } from '@/views/good-manage/good-detail/const'
/**
 * 创建订单
 */
export type CreateOrderParams = {
  /**
   * 商品ID
   */
  goodId: number
  /**
   * 抵扣金币
   */
  payPoints: number
  /**
   * 抵扣金额
   */
  payPrice: number
  /**
   * 是否使用金币
   */
  isUsePoints: USE_POINTS
  /**
   * 实际支付金额
   */
  realSale: number
  /**
   * 支付方式
   */
  payWay: number
  /**
   * 邮箱地址
   */
  email: string
  /**
   * 订单来源
   */
  sourceType: number
}

/**
 * 订单查询参数
 */
export interface SearchOrdersParams {
  /**
   * 邮箱
   */
  email?: string
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
 * 订单详情
 */
export type OrderDetailInfo = {
  /**
   * 商品简介
   */
  comment: string
  /**
   * 商品ID
   */
  goodId: number
  /**
   * 商品名称
   */
  goodName: string
  /**
   * 云盘地址
   */
  goodUrl: string
  /**
   * 是否使用积分
   */
  isPoints: number
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 支付积分
   */
  payPoints: number
  /**
   * 积分支付金额
   */
  payPrice: number
  /**
   * 支付方式
   */
  payWay: number
  /**
   * 商品图片
   */
  pictures: string[]
  /**
   * 实际支付金额
   */
  realPrice: number
  /**
   * 商品分类
   */
  categoryName: string
  /**
   * 商品状态
   */
  state: number
}
