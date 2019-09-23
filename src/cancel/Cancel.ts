export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  // instanceof 用来测试一个对象是否这个类的实例
  return value instanceof Cancel
}
