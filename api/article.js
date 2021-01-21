import { request } from '@/plugins/request'

// 获取公共文章列表
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的用户文章列表
export function getYourFeedArticles (params) {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNTk3NzQxNTA4fQ.2yO8Fss4hYnvsIN2UYHsutQ1hmYqSSAA-UrIRnP4DOY`
    // }
  })
}

// 添加点赞
export function addFavorite (slug) {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export function deleteFavorite (slug) {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export function getArticle (slug) {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export function getComments (slug) {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 发表评论
export function addComment (slug, data) {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除评论
export function deleteComment (slug, id) {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 发表文章
export function createArticle (data) {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 修改文章
export function updateArticle (slug, data) {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// 删除文章
export function deleteArticle (slug) {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}