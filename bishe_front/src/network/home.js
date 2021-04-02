import {request} from "@/network/requests"


// 获取文章列表
export function getArticleList(page, search) {
  let url = '/api/articles'

  let params = new URLSearchParams()
  params.appendIfExists('page', page)
  params.appendIfExists('search', search)

  const paramsString = params.toString()
  if (paramsString.charAt(0) !== '') {
    url += '/?' + paramsString
  }

  return request({
    method: 'get',
    url: url
  })
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    method: 'get',
    url: 'api/articles/' + id
  })
}

// 获取分类详情
export function getCategories() {
  return request({
    method: 'get',
    url: 'api/category/'
  })
}

// 获取标签详情
export function getTags() {
  return request({
    method: 'get',
    url: 'api/tag/'
  })
}

// 创建文章
export function createArticle(data, headers) {
  return request({
    method: 'post',
    url: 'api/articles/',
    data: data,
    headers: headers
  })
}

// 编辑文章
export function editArticle(id, data, headers) {
  return request({
    method: 'put',
    url: 'api/articles/' + id + '/',
    data: data,
    headers: headers
  })
}

// 登陆
export function login(data) {
  return request({
    method: 'post',
    url: 'api/token/',
    data: data,
  })
}

// 注册
export function registerUser(data) {
  return request({
    method: 'post',
    url: '/api/user/',
    data: data,
  })
}

// 刷新Token
export function refreshToken1(data) {
  return request({
    method: 'post',
    url: 'api/token/refresh/',
    data: data,
  })
}
