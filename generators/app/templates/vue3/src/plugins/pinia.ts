import type { App } from "vue";

export default (Vue: App) => {
  const pinia = createPinia()
  Vue.use(pinia)
}