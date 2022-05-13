/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-13 11:43:39
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 16:29:58
 * @FilePath: /XavierCoinAxios/src/helpers/data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isPlainObject } from './util'

// 转换为 json对象
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

// res转换为json对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }

  return data
}
