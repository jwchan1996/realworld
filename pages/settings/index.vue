<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  minlength="8"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isUpdatting" @click="updateUser">
                Update Settings
              </button>
            </fieldset>
          </form>

          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import { mapState, mapMutations } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  name: 'SettingIndex',
  data () {
    return { 
      image: '',
      bio: '',
      username: '',
      email: '',
      password: '',
      // 正在请求标志位
      isUpdatting: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.image = this.user.image
    this.bio = this.user.bio
    this.username = this.user.username
    this.email = this.user.email
    this.password = this.user.password
  },
  methods: {
    ...mapMutations(['setUser']),
    logout () {
      // 删除 Cookie
      Cookie.remove('user')
      // 提交 mutation 修改 state 状态
      this.setUser(null)
      // 跳转首页
      this.$router.push('/')
    },
    // 更新用户信息
    async updateUser () {
      this.isUpdatting = true
      const { data } = await updateUser({
        user: {
          image: this.image,
          bio: this.bio,
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
      // 保存用户登录状态
      this.$store.commit('setUser', data.user)
      // 为了防止刷新页面数据丢失，我们需要把数据持久化
      Cookie.set('user', data.user)
      this.isUpdatting = false
      // 跳转 profile
      this.$router.push(`/profile/${data.user.username}`)
    }
  }
};
</script>

<style>
</style>