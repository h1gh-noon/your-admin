import request from '@/utils/request'

export const testApi = data => {
  return request({
    method: 'post',
    url: '/testUrl',
    data
  })
}
