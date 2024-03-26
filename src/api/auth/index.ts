import http from '@/libs/http/axios'
import { RequestEnum } from '@/enums/httpEnum'
import type {
  LoginParams,
  RegisterParams,
  EditUserParams,
  EmailVerifyParams,
  ForgetVerifyParams
} from '@/interfaces/login'

enum Api {
  appVersion = '/v1/web/open/appinfo',
  register = '/v1/auth/register',
  logout = '/v1/auth/logout',
  forget = '/v1/auth/forget',
  oauthToken = '/v1/auth/login',
  userDetail = '/v1/auth/userinfo',
  userPoints = '/v1/auth/points',
  updateUserInfo = '/v1/web/auth/userinfo',
  verifyRegisterEmail = '/v1/web/open/register/mail/verify',
  verifyForgetEmail = '/v1/web/open/forget/mail/verify',
  verifyHasSendEmail = '/v1/web/open/mail/code/verify'
}

/**
 * 获取最新app版本
 * @param params
 */
export function getAppInfo() {
  return http.request(
    {
      url: Api.appVersion,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * 获取登录TOKEN
 * @param params
 */
export function getOauthToken(params: LoginParams) {
  return http.request(
    {
      url: Api.oauthToken,
      method: RequestEnum.POST,
      params: {
        ...params,
        account: params.username
      }
    },
    {
      isTransformRequestResult: false,
      isShowErrorMessage: true
    }
  )
}

/**
 * 获取用户信息
 * @param params
 */
export function getUserInfo() {
  return http.request(
    {
      url: Api.userDetail,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * 更新用户信息
 * @param params
 */
export function updateUserInfo(params: EditUserParams) {
  return http.request(
    {
      url: Api.updateUserInfo,
      method: RequestEnum.PUT,
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * 用户登出
 * @param params
 */
export function logout() {
  return http.request(
    {
      url: Api.logout,
      method: RequestEnum.POST
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 用户注册
 */
export function register(params: RegisterParams) {
  return http.request(
    {
      url: Api.register,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * 获取用户金币
 * @param params
 */
export function getUserPoints() {
  return http.request(
    {
      url: Api.userPoints,
      method: RequestEnum.GET
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 注册邮箱验证
 */
export function verifyRegisterEmail(params: EmailVerifyParams) {
  return http.request(
    {
      url: Api.verifyRegisterEmail,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 忘记邮箱验证
 */
export function verifyForgetEmail(params: EmailVerifyParams) {
  return http.request(
    {
      url: Api.verifyForgetEmail,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 已发送验证码邮箱验证
 */
export function verifyHasSendEmail(params: EmailVerifyParams) {
  return http.request(
    {
      url: Api.verifyHasSendEmail,
      method: 'POST',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}

/**
 * description: 忘记密码
 */
export function forget(params: ForgetVerifyParams) {
  return http.request(
    {
      url: Api.forget,
      method: 'PUT',
      params
    },
    {
      isShowErrorMessage: true
    }
  )
}
