import Vue from 'vue'
import dayjs from 'dayjs'

// {{ 表达式 | 过滤器 }} 比如 {{ item.create_time | date }} 
// 还可以传参 format 比如 {{ item.create_time | date('MMM DD, YYYY') }} 
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
