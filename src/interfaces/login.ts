/**
 * 登陆接口参数
 */
export interface LoginParams {
  /**
   * 用户名
   */
  username: string
  /**
   * 用户密码
   */
  password: string
}

/**
 * 邮箱验证参数
 */
export interface EmailVerifyParams {
  /**
   * 电子邮箱
   */
  email: string
  /**
   * 邮箱验证码
   */
  verifyCode?: string
}

/**
 * 忘记密码参数
 */
export interface ForgetVerifyParams {
  /**
   * 电子邮箱
   */
  email: string
  /**
   * 邮箱验证码
   */
  verifyCode?: string
  /**
   * 新密码
   */
  newPassword: string
  /**
   * 确认密码
   */
  confirmPassword: string
}

/**
 * 用户注册参数
 */
export interface RegisterParams {
  /**
   * 用户账号
   */
  account: string
  /**
   * 密码
   */
  password: string
  /**
   * 确认密码
   */
  confirmPassword: string
  /**
   * 邮箱验证码
   */
  verifyCode: string
  /**
   * 邮箱
   */
  email: string
}

/**
 * 更新用户资料
 */
export interface EditUserParams {
  /**
   * 用户ID
   */
  id: number
  /**
   * 用户账号
   */
  account: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 性别
   */
  sex: number
  /**
   * 昵称
   */
  name?: string
  /**
   * 手机号
   */
  mobile?: string
  /**
   * 生日
   */
  birth?: string
  /**
   * 地址
   */
  address?: string
  /**
   * 推广账号(默认微信号)
   */
  promotionId?: string
  /**
   * 用户简介
   */
  comment?: string
  /**
   * 头像地址
   */
  avatar?: string
}
