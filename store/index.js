// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必把 state 定义成一个函数，返回数据对象
// 也就是每次服务端渲染的页面的 state 都是一个新返回的数据对象
export const state = () => {
  return {
    // 当前登录用户的登录信息
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {}