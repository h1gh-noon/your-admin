import request from '@/utils/request'

export const getUserPageList = (params, data) => {
  return request({
    method: 'post',
    url: '/user/user/getUserPageList',
    params,
    data
  })
}
