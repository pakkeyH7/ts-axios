import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  // 因为不确定传多少个参数，所以不能指定类型 只能是any
  // 需要支持 axios(url, config?) 方法 （重载）
  request(url: any, config?: any): AxiosPromise {
    // 如果有传url
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      //  只有config 没传url
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    // Object.assign(目标对象, 源对象) 对象合并 把method 和url 合并到 config
    // 实际上调用 this.request方法也是传一个config参数
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    // Object.assign(目标对象, 源对象) 对象合并 把method 和url 合并到 config
    // 实际上调用 this.request方法也是传一个config参数
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
