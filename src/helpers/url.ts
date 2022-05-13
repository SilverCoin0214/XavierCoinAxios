/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-13 10:52:21
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 14:39:23
 * @FilePath: /XavierCoinAxios/src/helpers/url.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isDate, isObject, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values: string[]
    // 参数为数组的情况
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      // 为日期 或 对象时
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
