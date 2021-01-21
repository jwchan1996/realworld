import Request from '@/utils/request'

// 获取文章标签列表
export function getTags () {
  return Request({
    method: 'GET',
    url: '/api/tags'
  })
}