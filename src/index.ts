/*
 * @Author: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @Date: 2022-05-12 23:12:07
 * @LastEditors: 佐轩 zhangzuoxuan@apexsoft.com.cn
 * @LastEditTime: 2022-05-13 16:29:40
 * @FilePath: /XavierCoinAxios/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { buildURL } from './helpers/url'
import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse
} from './types/index.d'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 对 config里的数据执行处理
function processConfig(config: AxiosRequestConfig) {
  config.url = transfromUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 转换url
function transfromUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 转换request
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 转换headers
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 转换response, 如果是string则转为 json对象
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
