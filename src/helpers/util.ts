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

// 混合对象实现方法
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // 因为 to 是合并对象 所以断言为T&U
    // 开始是括号情况下需要加个分号  // from 是 U 类型不能赋值给T&U 所以断言any类型
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// let obj = {
//   second: '123',
//   first: {
//     third: {
//       fifth: {
//         sixth: '789'
//       }
//     },
//     forth: '456'
//   },
//
// }

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      // 对象所有属性名组成的字符串数组
      Object.keys(obj).forEach(key => {
        // key = first | second
        const val = obj[key]
        if (isPlainObject(val)) {
          // first
          if (isPlainObject(result[key])) {
            // result.first
            // 多层对象用递归
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
