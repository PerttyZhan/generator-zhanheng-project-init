import type { App } from "vue";
import Vant from 'vant'
import 'vant/lib/index.css'
import '@vant/touch-emulator'

export default (Vue: App) => {
  Vue.use(Vant)
}