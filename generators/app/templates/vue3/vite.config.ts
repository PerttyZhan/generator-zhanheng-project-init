import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import { promises as fs } from 'fs'
import { flow, split, last } from 'lodash'

// 自动导入库组件样式
import vitePluginImp from 'vite-plugin-imp'
// 审查
import Inspect from 'vite-plugin-inspect'
import { visualizer } from "rollup-plugin-visualizer"
// 自动导入 vue3的API 和 指定
import AutoImportApi from 'unplugin-auto-import/vite'
// 自动导入全局模块
import AutoImportComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 扩展setup功能，比如给SFC加上name, 因为keep-alive往往需要name
import VueExtendSetup from 'vite-plugin-vue-setup-extend'
// 自动导入图片
import AutoImportImages from 'vite-plugin-vue-images'
// 基于文件的路由
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
// 原子化的css引擎
import Unocss from 'unocss/vite'
// 国际化，语言包自动导入
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import generateSitemap from 'vite-ssg-sitemap'
import 'vite-ssg/single-page'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // {
    //   name: 'fix-el-button-css',
    //   enforce: 'pre',
    //   resolveId(id) {
    //     if (id.includes('el-button.css')) {
    //       return 'fix-el-button.css'
    //     }
    //   },
    //   async load(id) {
    //     if (id.includes('fix-el-button.css')) {
    //       const file = await fs.readFile(
    //         './node_modules/.pnpm/element-plus@2.2.13_vue@3.2.37/node_modules/element-plus/theme-chalk/el-button.css',
    //         'utf-8',
    //       )
    //       return file
    //     }
    //   },
    // },
    vue({
      reactivityTransform: true, // 开启ref转换
      template: {
        compilerOptions: {
          isCustomElement: tag => {
            // console.log('tag===', tag);
            return tag.startsWith("My")
          } 
        }
      }
    }),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'lodash',
    //       libDirectory: '',
    //       camel2DashComponentName: false
    //     },
    //     {
    //       libName: 'element-plus',
    //       libDirectory: 'es/components',
    //       nameFormatter: (name) => {
    //         return name.replace('el-', '')
    //       },
    //       style: (name) => {
    //         if (['el-config-provider', 'effect'].includes(name)) return false;
    //         return `element-plus/es/components/${name.replace('el-', '')}/style/css.mjs`
    //       },
    //     }
    //   ]
    // }),
    VueExtendSetup(),
    vueJsx(),
    Pages({
      dirs: 'src/views',
      extensions: ['vue'],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    // see unocss.config.ts for config
    Unocss(),
    // 国际化语言包配置
    vueI18n({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
    }),
    AutoImportImages({
      dirs: [
        'src/assets',
      ],
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    }),
    AutoImportComponents({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // 组件的有效文件扩展名。
      extensions: ['vue', 'tsx'],
      // 配置文件生成位置
      dts: 'src/types/components.d.ts',
      // ui库解析器
      resolvers: [
        // ElementPlusResolver({})
      ],
      // 排除
      include: [],
      exclude: []
    }),
    AutoImportApi({
      // 自动导入模块中的相关函数
      // imports: ['vue', 'vue-router', 'pinia'],
      imports: [
        'vue',
        'pinia',
        {
          'lodash': [
            ['sum', 'lodashSum'],
            'sumBy'
          ]
        },
        {
          'vue-i18n': [
            'useI18n',
            'createI18n'
          ]
        },
        {
          'vue-router': [
            'useRoute',
            'useRouter',
            'createRouter',
            'createWebHistory',
            'createWebHashHistory',
          ]
        },
        {
          '@vueuse/core': [
            'useMouse',
            'useDateFormat',
            'useNow'
          ]
        }
      ],
      // 指定API位置
      // dirs: [],
      // 配置文件生成位置
      dts: 'src/types/auto-imports.d.ts',
      // ui库解析器
      resolvers: [
        // ElementPlusResolver({})
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Inspect({
      enabled: true,
    }),
    visualizer({
      emitFile: true,
      filename: "stats.html",
    })
  ],
  resolve: {
    // 注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5172,
    proxy: {
      '/api/web': {
        target: 'http://125.120.226.164:38080',
        changeOrigin: true
      }
    }
  },
  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    format: "cjs",
    // formatting: 'minify',
    onFinished() { generateSitemap() },
  },
})
