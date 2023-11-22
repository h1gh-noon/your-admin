import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// create an axios instance
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    config.headers['token'] = useAuthStore().tokenComputed
    return config
  },
  error => {
    console.log('axios err' + error)
    return Promise.reject(error)
  }
)

// response
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && [401, 402, 403].includes(res.code)) {
      // localStorage.removeItem('userInfo')
      // router.replace('login')
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return Promise.resolve(res)
  },
  error => {
    console.log('axios err' + error)
    return Promise.reject(error)
  }
)

export default request
