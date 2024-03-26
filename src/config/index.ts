import { App } from 'vue'

const $baseConfig = {
  baseURL_test: 'https://101.200.161.42/api',
  baseURL: 'https://101.200.161.42/api'
}

const configDict = {
  development: {
    appId: '1209053073669521409',
    appCode: 'portal',
    baseURL: $baseConfig.baseURL_test
  },
  test: {
    appId: '1209053073669521409',
    appCode: 'portal',
    baseURL: $baseConfig.baseURL_test
  },
  uat: {
    appId: '1209053073669521409',
    appCode: 'portal',
    baseURL: $baseConfig.baseURL_test
  },
  production: {
    appId: '1096262626481082371',
    appCode: 'portal',
    baseURL: $baseConfig.baseURL
  }
}

const currentConfigKey = import.meta.env.VITE_APP_ENV_NAME as string

export const appConfig = {
  appCode: '',
  ...configDict[currentConfigKey],
  defaultAuthorization: 'Basic cG9ydGFsOnBvcnRhbA==',
  loginType: 'uc', // uc(用户中心)  oss(oa单点）
  version: '1.0.0'
}

// 暴露一个插件 API
const install = (app: App) => {
  // 在 this 上挂载一个贯穿方法，用 provider 也行
  app.config.globalProperties.$config = appConfig
}
export default install
