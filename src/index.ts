import { AxiosRequest } from './types'
import xhr from './xhr'
function axios(config: AxiosRequest): void{
    xhr(config)
}

export default axios