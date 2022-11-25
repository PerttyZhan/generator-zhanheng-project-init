import type { App } from "vue";

export default {
  install (Vue: App) {
    Object.values(import.meta.glob<Function>('./*.ts', { eager: true }))
      .forEach((module: any) => {
        module.default(Vue)
      })
  }
}