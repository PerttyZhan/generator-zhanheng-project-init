import Cookies from 'js-cookie'

export const TOKEN_KEY = '__tcmt__'

/**
 * 设置Token
 * @param string str 
 */
export const setToken = (str: string) => {
  Cookies.set(TOKEN_KEY, str)
}

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY)
}

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY)
}