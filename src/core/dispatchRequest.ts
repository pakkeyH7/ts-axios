import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from '../xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  console.log('6---发送请求函数')
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  console.log('7---处理配置Config')
  config.data = transform(config.data, config.headers, config.transformRequest)
  console.log('9---处理完请求data')
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramSerialzer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  // 用类型断言的方式 设置 url 不为空 url!
  return buildURL(url!, params, paramSerialzer)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
