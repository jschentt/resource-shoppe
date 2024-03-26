/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: object): string {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}

/**
 * @description: 获取地址栏参数
 * @param {*} paraName
 * @return {*}
 */
export function getUrlParam(paramName: string, url?: string) {
  const _url = url || window.location.search
  const svalue = _url.match(new RegExp(`[?&]${paramName}=([^&]*)(&?)`, 'i'))
  return svalue ? svalue[1] : ''
}
