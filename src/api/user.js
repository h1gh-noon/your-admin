import request from '@/utils/request'

export const getUserPageList = (params, data) => {
  return request({
    method: 'post',
    url: '/user/user/getUserPageList',
    params,
    data
  })
}

export const userAdd = (data) => {
  return request({
    method: 'post',
    url: '/user/user/userAdd',
    data
  })
}

export const userUpdate = (data) => {
  return request({
    method: 'post',
    url: '/user/user/userUpdate',
    data
  })
}

export const userDelete = (params) => {
  return request({
    method: 'post',
    url: '/user/user/userDelete',
    params
  })
}
