/**
 * 商品ID
 */
export interface CreateBehaviourParams {
  /**
   * 商品ID
   */
  goodId: number
}

/**
 * 商品查询参数
 */
export interface SearchBehaviourParams {
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 每页显示条数
   */
  pageSize: number
}
