import request from '@/utils/request'

export const testApi = data => {
  return request({
    method: 'post',
    url: '/testUrl',
    data
  })
}

export const userInfoApi = () => {
  return request({
    method: 'post',
    url: '/user/auth/userInfo',
  })
}

export const loginApi = data => {
  return request({
    method: 'post',
    url: '/user/auth/userLogin',
    data
  })
}

export const logoutApi = () => {
  return request({
    method: 'post',
    url: '/user/auth/loginOut'
  })
}
