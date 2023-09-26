import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { staticRouter } from '@/router/modules/staticRouter'

export const useAuthStore = defineStore('auth', () => {
  const tokenKey = 'token'

  const state = reactive({
    token: localStorage.getItem(tokenKey) || '',
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
  }
  const tokenComputed = computed(() => state.token)

  // set route
  const setRouteList = (val = []) => {
    state.routeList = val
  }
  const routeListComputed = computed(() => state.routeList)

  // roles routes
  const getAuthInfo = async () => {
    // axios
    state.routeList = [...staticRouter]
    state.accessRoutes = []
    state.userRoles = ['admin']
    return { roles: ['admin'] }
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

  return {
    setToken,
    tokenComputed,
    removeToken,
    setRouteList,
    routeListComputed,
    getAuthInfo,
    userRolesComputed,
    cacheRoutesComputed,
    accessRoutesComputed
  }
})
