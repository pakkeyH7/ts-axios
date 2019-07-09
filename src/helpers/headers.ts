import { isPlainObject } from './util'

// 规范化(转换成headers里面的Content-Type)
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

// 如果不设置请求头 服务器默认解析不了json格式的字符串的
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
  // 创建空对象
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  /*
   * 把 字符串
   *   a: AA
   *   b: BB
   *   c: CC
   *
   * 变成 对象
   *   { a: AA, b: BB, c: CC }
   *
   * */
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
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
