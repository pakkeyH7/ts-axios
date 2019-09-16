import axios, { AxiosTransformer } from '../../src/index'

import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[])],
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res)=>{
  console.log(res.data)
})
