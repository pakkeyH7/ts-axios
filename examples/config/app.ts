import axios, { AxiosTransformer } from '../../src/index'

import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

let instance = axios.create({
  transformRequest: [(function(data) {
    // qs.stringify(data)---请求数据需要formData
    // 如果不return data就没有值
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if(typeof data === 'object'){
      data.b = 2
    }
    return data
  }],
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 2
  }
})

axios({
  transformRequest: [(function(data) {
    // qs.stringify(data)---请求数据需要formData
    // 如果不return data就没有值
    return data
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if(typeof data === 'object'){
      data.b = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res)=>{
  console.log(res)
})

axios({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res)=>{
  console.log(res)
})
