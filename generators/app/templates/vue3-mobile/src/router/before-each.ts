import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import store from '../store'
const MAX = 10

export default async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const user = store.useUserStore()
  if (/^\/home/.test(to.path)) {
    return next()
  }
  if (!user.ready) {
    await user.initialize()
  }
  if (
    ['/data-management/list'].includes(to.path)
  ) {
    if (user.isLogin) next()
    else next({path: '/account/login'})
  } else if (
    ['/account/login'].includes(to.path)
    && user.isLogin
  ) {
    next({path: '/data-management/list'})
  } else {
    next()
  }
}