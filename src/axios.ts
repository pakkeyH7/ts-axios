import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  console.log('2---Axios实例化')
  const context = new Axios(config)
  // 混合对象，混合类型和instance 都是为了直接调用axios() 不需要.get.post
  // 把Axios这个类里面的request方法绑定在Axios的实例(context)上并且返回一个对象
  const instance = Axios.prototype.request.bind(context)
  // extend 方法用来合并
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function creat(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios

// 相当于这里把jack暴露出去
// class Person {
//   constructor(name){
//     console.log(`my name is ${name}`)
//   }
//   eat(food){
//     console.log(`i like eat ${food}`)
//   }
//   love(lover){
//     console.log(`i love ${lover}`)
//   }
// }
//
// function CreatePerson(name){
//   let person = new Person(name)
//   return person
// }
//
// let jack = CreatePerson('jack')
//
// jack.eat('fish')
//
// jack.love('rose')
//
// jack.love('lili')
