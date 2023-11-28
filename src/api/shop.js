import request from '@/utils/request'

export const getShopCategoryList = () => {
  return request({
    method: 'post',
    url: '/jdstore/shop/getShopCategoryList'
  })
}

export const shopCategoryAdd = data => {
  return request({
    method: 'post',
    url: '/jdstore/shop/shopCategoryAdd',
    data
  })
}

export const shopCategoryUpdate = data => {
  return request({
    method: 'post',
    url: '/jdstore/shop/shopCategoryUpdate',
    data
  })
}

export const shopCategoryDelete = params => {
  return request({
    method: 'post',
    url: '/jdstore/shop/shopCategoryDelete',
    params
  })
}

export const getShopPageList = params => {
  return request({
    method: 'post',
    url: '/jdstore/shop/getShopPageList',
    params
  })
}

export const shopAdd = data => {
  return request({
    method: 'post',
    url: '/jdstore/shop/shopAdd',
    data
  })
}

export const shopUpdate = data => {
  return request({
    method: 'post',
    url: '/jdstore/shop/shopUpdate',
    data
  })
}

export const shopDelete = params => {
  return request({
    method: 'post',
    url: '/jdstore/shop/shopDelete',
    params
  })
}
