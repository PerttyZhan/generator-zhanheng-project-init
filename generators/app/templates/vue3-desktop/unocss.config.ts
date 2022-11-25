import {
  defineConfig,
  presetUno,
  presetAttributify,
} from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  preprocess (matcher) {
    return matcher.startsWith('wy-')
    ? matcher.slice(3)
    : matcher // ignore
  },
  presets: [
    presetAttributify(),
    presetUno(),
    // @ts-ignore
    presetIcons({
      collections: {
        custom: {
          circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
        },
        ph: () => import('@iconify-json/ph/icons.json').then(i => i.default),
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default),
        fluent: () => import('@iconify-json/fluent/icons.json').then(i => i.default),
        'material-symbols': () => import('@iconify-json/material-symbols').then(i => i.default)
      }
    }),
  ],
  rules: [
    ['text-chart-title', {color: '#3190FF', 'font-size': '1rem', 'font-weight': 400}],
  ],
  shortcuts: [
    {
      'y-line': 'w-1px h-full'
    }
  ],
  theme: {
    colors: {
      panelTitle: '#3190FF'
    }
  }
})