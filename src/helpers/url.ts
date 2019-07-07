import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  // 把转义后的字符串转义回来
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/*
   思路：参数拼接格式 ?key=val&key1=val1&key2=val2
   用数组的join方法实现，把params的键值对拆分成字符串形式保存在数组里面
   ['key=val', 'key1=val1', 'key2=val2']
*/

export function buildURL(url: string, params?: any): string {
  // 不传params 直接返回url
  if (!params) {
    return url
  }

  const parts: string[] = []

  // 遍历对象的方法
  // Object.keys(params) 以数组形式返回键 ['a', 'b']
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果键没有值，直接忽略(不会跳出循环)
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 先判断params里面的键是否有数组
    if (Array.isArray(val)) {
      // values = [1, 2, 3]
      values = val
      key += '[]'
    } else {
      // 不是数组就统一成数组
      // values = [{key: val}] | ['string'] | [date类型]
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        // 转换成日期类型的字符串
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // 转换成json类型的字符串
        val = JSON.stringify(val)
      }
      // 把键值对拼接成字符串
      // ['key=val', 'key1=val1']
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 是否有哈希的字符，有的话把后面的全部去掉
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      // slice 返回值 从第0个返回到markIndex个
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
