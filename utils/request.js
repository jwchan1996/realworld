/**
 * 基于 axios 封装的请求处理
 */

import axios from 'axios'

const request = axios.create({
  baseUrl:'https://conduit.productionready.io'
})

// 请求拦截器

// 响应拦截器

export default request