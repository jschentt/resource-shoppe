/**
 * 是否使用金币
 */
export enum USE_POINTS {
  // 否
  NO = 0,
  // 是
  YES = 1
}

/**
 * 订单来源
 */
export enum SOURCE_TYPE {
  // PC端
  PC = 0,
  // 手机端
  PHONE = 1,
  // APP端
  APP = 2
}

/**
 * 支付方式
 */
export enum PAY_WAY {
  // 微信
  Wechat = 1,
  // 支付宝
  Alipay = 2,
  // 金币支付
  Points = 3,
  // 微信+金币支付
  WechatPoints = 4,
  // 支付宝+金币支付
  AlipayPoints = 5
}

/**
 * 支付状态
 */
export enum ORDER_STATE {
  // 待支付
  WAIT_PAY = 1,
  // 已完成
  FINISHED = 2,
  // 支付失败
  FAIL = 3,
  // 退款
  REFUND = 4
}
