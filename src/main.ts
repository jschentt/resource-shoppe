import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupGlobalConfigs, setupGlobalMethods } from '@/plugins'
import '@/assets/styles/tailwind.css'
import './app.scss'

const app = createApp(App)
// 注册全局方法，如：app.config.globalProperties.$message = message
setupGlobalMethods(app)
// 注册全局配置
setupGlobalConfigs(app)
// 挂载vuex状态管理
setupStore(app)
// 挂载路由
setupRouter(app)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
