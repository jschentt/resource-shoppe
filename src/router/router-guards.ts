import { isNavigationFailure, Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由守卫
export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, _, next) => {
    NProgress.start() // start progress bar
    document.title = to.meta.title
    next()
  })

  router.afterEach((_to, _from, failure) => {
    if (isNavigationFailure(failure)) {
      console.log('failed navigation', failure)
    }
    NProgress.done() // finish progress bar
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
