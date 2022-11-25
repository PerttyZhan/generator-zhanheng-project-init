import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { App } from 'vue';
import type { Router } from 'vue-router';
import routerBeforeEach from './before-each'

const routes = setupLayouts(generatedRoutes)
const routeConfig = {
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    }
  ].concat(routes)
}
export default routeConfig;
export function setupRouter (_app: App, router: Router) {
  router.beforeEach(routerBeforeEach)
}