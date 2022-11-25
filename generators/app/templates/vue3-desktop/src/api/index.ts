import { createFetch } from '@vueuse/core'
import querystring from 'node:querystring'
import { get as _get } from 'lodash'

const userFetch = createFetch({
  baseUrl: import.meta.env.VITE_WEB_BASE_API,
  options: {
    async beforeFetch (context) {
      return context
    },
    async afterFetch (context) {
      if (_get(context.data, 'data')) {
        context.data = _get(context.data, 'data')
      }
      return context
    }
  },
  fetchOptions: {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;chartset=utf-8;'
    }
  }
})

export const get = (url: string, params?: any ) => {
  let formatUrl = url
  if (params) {
    formatUrl += '?' + querystring.stringify(params)
  }
  return userFetch(formatUrl).get().json()
}

export const post = async (url: string, params: any = {}) => {
  return userFetch(url).post(params).json()
}