/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-12 23:26:20
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 16:01:33
 * @FilePath: /XavierCoinAxios/src/xhr.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { parseHeaders } from './helpers/headers'
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from './types/index.d'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    // 判断是否配置了 responseType
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    // 当状态发生改变时, 处理response
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
