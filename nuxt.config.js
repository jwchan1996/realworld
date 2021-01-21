/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // 路由 link 活动时的 class
    linkActiveClass: 'active',
    // 自定义路由表
    extendRoutes (routes, resolve) {
      // 清除 nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      
      routes.push(...[
        { 
          path: '/',
          component: resolve(__dirname, 'pages/layout/index.vue'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/index.vue')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/index.vue')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/index.vue')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/index.vue')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/index.vue')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/index.vue')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/index.vue')
            },
          ]
        }
      ])
    }
  },

  // 注册插件（nuxtjs 中只有这样 Vue.use 的插件才能个生效）
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}