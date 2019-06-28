import { AxiosRequest } from './types'

function xhr (config: AxiosRequest): void {
    // 设置默认值
    const {data = null, url, method = 'get'} = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}

export default xhr