import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

// config1 = {
//   method: 'get',
//   thimeout: 0,
//   headers: {
//     common: {
//       Accept: 'application/json,text/plain,*/*'
//     }
//   }
// }
//
// config2 = {
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
//   headers: {
//     test: '123'
//   }
// }
//
// merged = {
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
//   thimeout: 0,
//   headers: {
//     common: {
//       Accept: 'application/json,text/plain,*/*',
//     },
//     test: '123'
//   }
// }

const strats = Object.create(null)

// 默认的合并策略 优先取val2的值
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取val2的值
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 复杂对象的合并策略(headers)
function deepMergeStrat(val1: any, val2: any): any {
  // 判断val2是不是对象
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
    //  val2 有值 并且不是对象
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    // 因为val2没有值
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

// 这三个没有设置默认值
const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  console.log('5---合并默认Config和自定义Config')
  if (!config2) {
    config2 = {}
  }

  // 创建空对象并且是any类型
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // 如果是url params data 就是 strats[key]
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
