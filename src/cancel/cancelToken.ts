import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface PesolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: PesolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    /*
     * 用户调用：
     *
     * cancelToken: new CancelToken(function executor(c) {
     *   cancel = c;
     * })
     *
     * 把
     *
     * (message => {
     *   if (this.reason) {
     *     return
     *   }
     *   this.reason = new Cancel(message)
     *   resolvePromise(this.reason)
     * })
     *
     * 这个参数回调出去(赋值给cancel)
     *
     * 用户只需要把cancel调用即可取消请求
     *
     * */

    // 传入executor函数 这里是调用executor函数，它的参数是一个回调函数
    // 这里需要把它的回调函数取出来，再给用户调用进而取消
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      // 手动将promise的pending状态变成fulfilled，然后就执行xhr文件的cancelToken的promise属性的.then
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  /*
   *
   * 用户调用：
   *
   * const CancelToken = axios.CancelToken;
   * const source = CancelToken.source();
   *
   * axios.get('/user/12345', {
   *   cancelToken: source.token
   * }).catch(function (e) {
   *
   * });
   *
   * // 取消请求 (请求原因是可选的)
   * source.cancel('Operation canceled by the user.');
   *
   * source是返回的 { token, cancel }
   *
   * */

  /*
   *
   * CancelToken的token实例化，流程跟上面方法同理
   * c executor里面的参数，即c为：
   *
   * (message => {
   *   if (this.reason) {
   *     return
   *   }
   *   this.reason = new Cancel(message)
   *   resolvePromise(this.reason)
   * })
   *
   * 把c赋值给cancel属性
   *
   * 即调用cancel属性取消请求
   *
   * 传入信息(message)：
   *   通过isCancel打印信息？
   *
   **/

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      token,
      cancel
    }
  }
}
