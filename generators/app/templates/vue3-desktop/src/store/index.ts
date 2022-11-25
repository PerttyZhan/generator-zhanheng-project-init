import { createPinia } from 'pinia'
import type { App } from 'vue'

const pinia = createPinia()

export function setupPinia (app: App, initialState: Record<string, any>) {
  app.use(pinia)

  if (import.meta.env.SSR) {
    // this will be stringified and set to window.__INITIAL_STATE__
    initialState.pinia = pinia.state.value
  }
  else {
    // on the client side, we restore the state
    pinia.state.value = initialState.pinia || {}
  }
}

// export * from './user.store'
const stores: any = {}
Object.values(import.meta.glob<Function>('./*.ts', { eager: true }))
  .forEach((module: any) => {
    Object.keys(module).forEach(key => {
      stores[key] = module[key]
    })
  })

export default stores