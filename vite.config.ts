import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

const envResolve = (mode: string, env: string) => loadEnv(mode, process.cwd())[env]
const localEnabled = process.env.USE_MOCK || false
const prodEnabled = process.env.USE_CHUNK_MOCK || false

export default ({ mode }: ConfigEnv): UserConfigExport => {
  console.log('🚀 ~ process.env.NODE_ENV ~ 打包路径：', envResolve(mode, 'VITE_APP_BASE_PATH'))
  return {
    base: mode === 'development' ? '/' : '/portal/',
    define: {
      __IS_MOCK__: localEnabled || prodEnabled // 是否开启mock
    },
    build: {
      sourcemap: true,
      manifest: true,
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      // 去除console
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    css: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      },
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `@use "@/assets/styles/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        dts: 'src/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          {
            vuex: ['useStore']
          }
        ],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        // search for subdirectories
        deep: true,
        // valid file extensions for components.
        extensions: ['vue', 'md'],
        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        // resolvers for custom components
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        // generate `components.d.ts` global declarations,
        dts: 'src/components.d.ts'
      }),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          // 需要注入 index.html ejs 模版的数据
          data: {
            title: '麦云分享'
          }
        }
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: localEnabled as unknown as boolean,
        prodEnabled: prodEnabled as unknown as boolean,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
                import { setupProdMockServer } from '/mock/mockProdServer';
                setupProdMockServer();
                `
      }),
      PkgConfig({ packageJsonPath: 'package.vite.json' }),
      OptimizationPersist()
    ],
    resolve: {
      alias: {
        // src 目录路径
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      open: true,
      cors: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://101.200.161.42',
          changeOrigin: true
        }
      }
    }
  }
}
