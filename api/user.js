import { request } from '@/plugins/request'

// 用户登录
export function login(data) {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
