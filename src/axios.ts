import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 混合对象，混合类型和instance 都是为了直接调用axios() 不需要.get.post
  // 指向Axios这个类原型上的request方法，并且绑定他的实例context(因为有this，绑定上下文)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
