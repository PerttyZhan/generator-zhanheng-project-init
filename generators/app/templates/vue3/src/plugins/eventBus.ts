import type { App } from "vue";
import mitt from 'mitt'

export default (app: App) => {
  app.config.globalProperties.$bus = mitt()
}