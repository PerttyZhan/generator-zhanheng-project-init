import type { App } from "vue";
// import * as vueI18n from 'vue-i18n';
// const { createI18n } = vueI18n

/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/vite-plugin-vue-i18n/messages'

export default (Vue: App) => {
  const i18n = createI18n({
    locale: 'zh-CN',
    messages
  })
  Vue.use(i18n)
}