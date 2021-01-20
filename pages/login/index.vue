<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
            <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}  // 错误信息
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit () {
      // 提交表单请求登录
      if (this.isLogin) {
        await login({
          user: this.user
        }).then(response => {
          console.log(response)
          // TODO: 保存用户登录状态
          this.$store.commit('setUser', data.user)
          // 跳转到首页
          this.$router.push('/')
        }).catch(error => {
          console.dir(error)
          this.errors = error.response.data.errors
        })
      } else {
        await register({
          user: this.user
        }).then(response => {
          console.log(response)
          // TODO: 保存用户登录状态
          this.$store.commit('setUser', data.user)
          // 跳转到首页
          this.$router.push('/')
        }).catch(error => {
          console.dir(error)
          this.errors = error.response.data.errors
        })
      }
      
    }
  }
};
</script>

<style>
</style>