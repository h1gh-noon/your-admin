import request from '@/utils/request'

export const getProductCategoryList = () => {
  return request({
    method: 'post',
    url: '/jdstore/product/getProductCategoryList'
  })
}

export const productCategoryAdd = data => {
  return request({
    method: 'post',
    url: '/jdstore/product/productCategoryAdd',
    data
  })
}

export const productCategoryUpdate = data => {
  return request({
    method: 'post',
    url: '/jdstore/product/productCategoryUpdate',
    data
  })
}

export const productCategoryDelete = params => {
  return request({
    method: 'post',
    url: '/jdstore/product/productCategoryDelete',
    params
  })
}

export const getProductPageList = params => {
  return request({
    method: 'post',
    url: '/jdstore/product/getProductPageList',
    params
  })
}

export const productAdd = data => {
  return request({
    method: 'post',
    url: '/jdstore/product/productAdd',
    data
  })
}

export const productUpdate = data => {
  return request({
    method: 'post',
    url: '/jdstore/product/productUpdate',
    data
  })
}

export const productDelete = params => {
  return request({
    method: 'post',
    url: '/jdstore/product/productDelete',
    params
  })
}
