const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // 类型谓词保护
  // 判断是否是日期类型
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object { // 类型谓词保护
//   // 判断是否是对象
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  //  判断是否普通对象 (避免form对象冲突)
  return toString.call(val) === '[object Object]'
}
