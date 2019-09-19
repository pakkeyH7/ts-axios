import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

import { parseHeaders } from './helpers/headers'

import { createError } from './helpers/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  console.log('11---发送请求')
  return new Promise((resolve, reject) => {
    // 设置默认值
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }
      console.log('12---请求成功')

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      console.log('13---设置响应头')
      const responseData = responseType !== 'text' ? request.response : request.responseText
      console.log('14---设置响应data')
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      console.log('15---设置响应配置')
      handleResponse(response)
    }

    // 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 请求超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    // 状态码错误
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        console.log('16---响应成功')
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}

export default xhr
