import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 用类型断言的方式 设置 url 不为空 url!
  return buildURL(url!, params)
}

// 处理body里面的data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理headers
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
