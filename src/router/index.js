import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { staticRouter, errorRouter } from './modules/staticRouter'
import NProgress from '@/common/nprogress'
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  scrollBehavior: () => ({ left: 0, top: 0 })
})
const whiteList = ['/login', '/redirect']
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  console.log('router', to.path)
  document.title = to.meta?.title ?? ''

  const authStore = useAuthStore()
  if (authStore.tokenComputed) {
    if (to.path === '/login') {
      // 已登录
      next({ path: '/' })
    } else {
      if (authStore.userInfoComputed) {
        next()
      } else {
        try {
          await authStore.getAuthInfo()
          const accessRoutes = authStore.accessRoutesComputed
          // 添加动态路由
          accessRoutes.forEach(item => {
            router.addRoute(item)
          })
          next()
        } catch (e) {
          authStore.removeToken()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 无token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 去登录
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
