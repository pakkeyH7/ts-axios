import axios, { AxiosTransformer } from '../../src/index'

import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

axios({
  // transformRequest: [(function(data, headers) {
  //   // qs.stringify(data)---请求数据需要formData
  //   // 如果不return data就没有值
  //   return qs.stringify(data)
  // }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  // transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
  //   if(typeof data === 'object'){
  //     data.b = 2
  //   }
  //   return data
  // }],
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  })
}).then((res)=>{
  console.log(res)
})

let data = qs.stringify({a: 1})
axios.post('/config/post',
  data
).then(res=>{
  console.log(res)
})
