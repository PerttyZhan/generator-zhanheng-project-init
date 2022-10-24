import type { UseFetchReturn } from '@vueuse/core'
import { get, post } from './index'

export const getUserInfo = (): PromiseLike<UseFetchReturn<any>> => {
  return get('/sysUser/getUserInfo')
}
export const loginIn = (params: any): PromiseLike<UseFetchReturn<any>> => {
  return post('/sysUser/login', params)
}