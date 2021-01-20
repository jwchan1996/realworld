import Request from '@/utils/request'

// 获取公共文章列表
export function getArticles (params) {
  return Request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取公共文章列表
export function getYourFeedArticles (params) {
  return Request({
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
  return Request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export function deleteFavorite (slug) {
  return Request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export function getArticle (slug) {
  return Request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export function getComments (slug) {
  return Request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
