import router from '@/router'
import { LOGIN_URL } from '@/common/config'
import { useAuthStore } from '@/stores/auth'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = useAuthStore()

  try {
    // 1.获取菜单列表 && 按钮权限列表

    // 2.判断当前用户有没有菜单权限
    // if (!authStore.authMenuListGet.length) {
    //   router.replace(LOGIN_URL)
    //   return Promise.reject('No permission')
    // }

    // 3.添加动态路由
    // authStore.flatMenuListGet.forEach((item) => {
    //   item.children && delete item.children
    //   if (item.component && typeof item.component == 'string') {
    //     item.component = modules['/src/views' + item.component + '.vue']
    //   }
    //   if (item.meta.isFull) {
    //   } else {
    //   }
    // })
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}
