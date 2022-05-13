/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-13 15:08:47
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 15:59:50
 * @FilePath: /XavierCoinAxios/src/helpers/headers.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isPlainObject } from './util'

// 规范化headerName
function normalizeHeaderName(headers: any, normalizedName: string) {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}
