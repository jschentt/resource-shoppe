import NP from 'number-precision'
import {
  ElMessageBox as Modal,
  ElMessage as Message,
  ElNotification as Notification
} from 'element-plus'

/**
 * 数字处理
 * @param num 数值
 * @param digitLength 小数位精度
 * @param options.nullDefault undefined、null 或空字符串时的替代文本，默认为 -
 * @param options.divide 千分位逗号分隔
 * @param options.tenThousand 以「万」为单位返回
 * @param options.unit 附加单位「元」或者「万元」
 * @param options.trimZero 小数位去除尾部 0
 */
export function numberFixed(
  num?: string | number | null,
  // eslint-disable-next-line default-param-last
  digitLength = 2,
  options?: {
    nullDefault?: string
    divide?: boolean
    tenThousand?: boolean
    unit?: boolean
    trimZero?: boolean
  }
) {
  const { nullDefault, divide, tenThousand, unit, trimZero } = options ?? {}
  let actualDigitLength = digitLength
  let unitName = '元'

  if (num === undefined || num === null || num === '') {
    return nullDefault ?? '-'
  }
  if (Number.isNaN(+num)) {
    return num
  }

  let result = num
  if (tenThousand && Number(num) >= 10000) {
    result = NP.divide(num, 10000)
    actualDigitLength = NP.plus(actualDigitLength, 4)
  }
  if (trimZero) {
    result = NP.round(result, actualDigitLength)
  } else {
    result = NP.strip(+result).toFixed(actualDigitLength)
  }
  if (divide) {
    const reg = `${result}`.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    result = `${result}`.replace(reg, '$1,')
  }
  if (unit) {
    if (tenThousand && Number(num) >= 10000) {
      unitName = '万元'
    }
    return result + unitName
  }

  return result
}

// 复制内容到剪贴板
export function copy(str: string) {
  const save = (e: any) => {
    e.clipboardData.setData('text/plain', str)
    e.preventDefault() // 阻止默认行为
  }
  document.addEventListener('copy', save)
  document.execCommand('copy') // 使文档处于可编辑状态，否则无效
  document.removeEventListener('copy', save) // 卸载copy监听事件，避免与command+c冲突
}

// 显示消息提示
const showMessage = (type: 'success' | 'warning' | 'info' | 'error', message: string) => {
  Message({
    type,
    message,
    appendTo: document.getElementById('app'),
    customClass: 'custom-message'
  })
}

// 消息提示弹窗
const showNotification = (type: 'success' | 'warning' | 'info' | 'error', message: string) => {
  Notification({
    type,
    message,
    appendTo: document.getElementById('app'),
    customClass: 'custom-message'
  })
}

// 消息消息弹窗
const showModal = (
  type: 'success' | 'warning' | 'info' | 'error',
  title: string,
  message: string,
  callback: () => void,
  props: any = {}
) => {
  Modal({
    title,
    type,
    showCancelButton: true,
    message,
    customStyle: { maxWidth: '260px' },
    ...props
  }).then(() => {
    callback && callback()
  })
}

export const message = {
  success: (message: string) => showNotification('success', message),
  error: (message: string) => showNotification('error', message),
  warning: (message: string) => showNotification('warning', message),
  info: (message: string) => showNotification('info', message)
}

export const notification = {
  success: (message: string) => showMessage('success', message),
  error: (message: string) => showMessage('error', message),
  warning: (message: string) => showMessage('warning', message),
  info: (message: string) => showMessage('info', message)
}

export const modal = {
  success: (title: string, message: string, callback?: () => void, props?: any) =>
    showModal('success', title, message, callback, props),
  error: (title: string, message: string, callback?: () => void, props?: any) =>
    showModal('error', title, message, callback, props),
  warning: (title: string, message: string, callback?: () => void, props?: any) =>
    showModal('warning', title, message, callback, props),
  info: (title: string, message: string, callback?: () => void, props?: any) =>
    showModal('info', title, message, callback, props)
}

/*
 * 防抖处理
 */
export const debounce = (fn: any, wait: number) => {
  let timer: any = null
  return () => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

/*
 * 生成1到10之间随机数
 */
export const genRandom = () => {
  return Math.floor(Math.random() * 10) + 1
}

/*
 * 根据某一个键值去重
 */
export const uniqueArray = (arr, key) => {
  const res = new Map()
  return arr.filter((item) => !res.has(item[key]) && res.set(item[key], 1))
}

/*
 * 判断手机&pc环境
 */
export const isMobile = () => {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true // 移动端
  }
  return false // PC端
}

/*
 * 判断微信环境
 */
export const isWeixn = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isWeixin = ua.indexOf('micromessenger') !== -1
  if (isWeixin) {
    return true
  }
  return false
}

/*
 * 判断ios环境
 */
export const isiOS = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

/*
 * 判断android环境
 */
export const isAndroid = () => {
  if (/android/i.test(navigator.userAgent)) {
    return true
  }
  return false
}

/*
 * 判断APP环境
 */
export const isApp = () => {
  const source = localStorage.getItem('source')
  if (source === 'app') {
    return true
  }
  return false
}
