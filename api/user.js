import Request from '@/utils/request'

// 用户登录
export function login(data) {
  return Request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export function register(data) {
  return Request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
