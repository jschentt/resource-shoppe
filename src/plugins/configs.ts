import { App } from 'vue'
import config from '@/config'
import 'virtual:svg-icons-register'
/**
 * 注册全局配置
 * @param app
 */
export function setupGlobalConfigs(app: App) {
  app.use(config)
}
