import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { staticRouter } from '@/router/modules/staticRouter'
import { loginApi, userInfoApi } from '@/api/baseApi'

export const useAuthStore = defineStore('auth', () => {
  const tokenKey = 'token'

  const state = reactive({
    token: localStorage.getItem(tokenKey) || '',
    userInfo: null,
    routeList: [],
    userRoles: [],
    accessRoutes: []
  })

  // set token
  const setToken = val => {
    localStorage.setItem(tokenKey, val)
    state.token = val
  }

  const removeToken = () => {
    localStorage.removeItem(tokenKey)
    state.token = ''
    state.userInfo = null
  }
  const tokenComputed = computed(() => state.token)
  const userInfoComputed = computed(() => state.userInfo)

  // set route
  const setRouteList = (val = []) => {
    state.routeList = val
  }
  const routeListComputed = computed(() => state.routeList)

  // roles routes
  const getAuthInfo = async () => {
    // axios
    // const res = await userInfoApi()
    // if (res.success) {
    // state.userInfo = res.data.userInfo

    // 模拟数据
    state.userInfo = 'ss'
    state.routeList = [...staticRouter]
    state.accessRoutes = []
    state.userRoles = ['admin']
    // }
  }

  // 过滤需要缓存(keepAlive)的路由
  const getCacheRoutesHandler = arr => {
    return arr.reduce((acc, cur) => {
      if (cur.meta?.keepAlive && cur.name) {
        acc.push(cur.name)
      }
      if (cur.children && cur.children.length) {
        acc.push(...getCacheRoutesHandler(cur.children))
      }
      return acc
    }, [])
  }
  const cacheRoutesComputed = computed(() =>
    getCacheRoutesHandler(state.routeList)
  )
  const userRolesComputed = computed(() => state.userRoles)
  const accessRoutesComputed = computed(() => state.accessRoutes)

  const loginHandler = data =>
    loginApi(data)
      .then(res => {
        if (res.success) {
          // ...
          setToken(res.data.token)
          state.userInfo = res.data.userInfo
          // 模拟数据
          state.routeList = [...staticRouter]
          state.accessRoutes = []
          state.userRoles = ['admin']
        }
      })
      .catch(() => {
        // 模拟数据
        setToken('sss')
        state.userInfo = 'ss'
      })

  return {
    tokenComputed,
    removeToken,
    setRouteList,
    routeListComputed,
    getAuthInfo,
    userRolesComputed,
    cacheRoutesComputed,
    accessRoutesComputed,
    userInfoComputed,
    loginHandler
  }
})
