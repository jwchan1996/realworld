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

// 关注用户
export function addFollow (username) {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// 取消关注
export function deleteFollow (username) {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}

// 获取用户 profile 信息
export function getProfile (username) {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}