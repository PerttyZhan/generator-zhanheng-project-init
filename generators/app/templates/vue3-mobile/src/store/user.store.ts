import { defineStore } from 'pinia'
import { getToken, removeToken } from '../utils/token'
import { loginIn, getUserInfo } from '../api/account'
import md5 from 'js-md5'

interface User {
  token: string | null,
  ready: boolean,
  loginName: string
}

export const useUserStore = defineStore('user', {
  state (): User {
    return {
      ready: false,
      token: null,
      loginName: ''
    }
  },
  getters: {
    isLogin (state) {
      return !!state.token
    }
  },
  actions: {
    async initialize () {
      if (this.ready) return
      this.token = getToken() as string
      if (this.token) {
        await this.getInfo()
      }
      this.ready = true
      
    },
    async login (accountName: string, accountNamePwd: string) {
      const params = {
        loginId: accountName.trim(),
        password: md5(accountNamePwd)
      }
      const { data } = await loginIn(params)
      this.loginName = get(data.value, 'loginName')
      this.token = getToken() as string
    },
    async getInfo () {
      const { data, statusCode } = await getUserInfo()
      if (statusCode.value === 403) {
        this.token = null
        removeToken()
      } else {
        this.loginName = get(data.value, 'loginName')
      }
    }
  }
})