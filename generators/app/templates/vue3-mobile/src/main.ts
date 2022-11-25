import App from './App.vue'
import { setupPinia } from './store'
import routeConfig, { setupRouter } from './router'
import { ViteSSG } from 'vite-ssg'

import './assets/main.css'
import 'amfe-flexible/index.js'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import ProjectPlugin from './plugins'

export const createApp = ViteSSG(
  App,
  routeConfig,
  ({ app, router, initialState }) => {
    setupPinia(app, initialState)
    setupRouter(app, router)
    app.use(ProjectPlugin)
  },
)
