import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { staticRouter, errorRouter } from './modules/staticRouter'
import NProgress from '@/common/nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  scrollBehavior: () => ({ left: 0, top: 0 })
})
const whiteList = ['/login', '/redirect']
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = to.meta?.title ?? ''

  const authStore = useAuthStore()
  if (authStore.tokenComputed) {
    if (to.path === '/login') {
      // 已登录
      next({ path: '/' })
    } else {
      const hasRoles = authStore.userRolesComputed?.length
      if (hasRoles) {
        next()
      } else {
        try {
          // const { roles } =
          await authStore.getAuthInfo()

          const accessRoutes = authStore.accessRoutesComputed
          accessRoutes.forEach(item => {
            router.addRoute(item)
          });

          next({ ...to, replace: true })
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
