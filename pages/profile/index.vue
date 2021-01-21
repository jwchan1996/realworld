<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" v-if="profile.image" />
            <img src="https://ae01.alicdn.com/kf/U1615c605dcf74ca98186e1754ef329b1R.jpg" class="user-img" v-else />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio || 'This is no signature' }}
            </p>
            <button
              style="float: right;"
              class="btn btn-sm btn-outline-secondary"
              :class="{
                active: profile.following,
              }"
              @click="onFollow"
              :disabled="isOnFollowing"
              v-if="user.username !== profile.username"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "unFollow" : "Follow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <!-- <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li> -->

              <li class="nav-item" style="cursor: pointer;">
                <span
                  class="nav-link"
                  :class="{
                    active: tab === 'my_articles'
                  }"
                  exact
                  @click="selectTab('my_articles')"
                  >My Articles</span
                >
              </li>
              <li class="nav-item" style="cursor: pointer;">
                <span
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited_articles'
                  }"
                  exact
                  @click="selectTab('favorited_articles')"
                  >Favorited Articles</span
                >
              </li>

            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFollow, deleteFollow, getProfile } from '@/api/user'
import { addFavorite, deleteFavorite } from '@/api/article'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  data () {
    return {
      // 当前个人主页用户信息
      profile: {
        username: '**',
        bio: '',
        image: '',
        following: false
      },
      isOnFollowing: false,
      tab: this.$route.query.tab || 'my_articles',
      articles: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getProfile()
    this.getArticles()
  },
  methods: {
    // 获取用户 profile 信息
    async getProfile () {
      const { data } = await getProfile(this.$route.params.username)
      this.profile = data.profile
    },
    // 关注操作
    async onFollow() {
      // 改变关注按钮为不可点击状态
      this.isOnFollowing = true;
      if (this.profile.following) {
        // 取消关注
        await deleteFollow(this.profile.username);
        this.profile.following = false;
      } else {
        // 添加关注
        await addFollow(this.profile.username);
        this.profile.following = true;
      }
      // 改变关注按钮为可点击状态
      this.isOnFollowing = false;
    },
    // 获取文章列表
    async getArticles () {
      const params = this.tab === 'my_articles' ? {
        author: this.$route.params.username
      } : {
        favorited: this.$route.params.username
      }
      const { data } = await getArticles(params)
      const { articles } = data
      // 增加点赞按钮不能点击标志
      articles.forEach(article => article.favoriteDisabled = false)
      this.articles = articles
    },
    // 点击 tab
    selectTab (tab) {
      this.$router.replace({
        name: 'profile',
        path: `/profile/${this.$route.params.username}`,
        query: {
          tab
        }
      })
      this.tab = tab
      this.getArticles()
    },
    // 点赞文章操作
    async onFavorite (article) {
      // 改变点赞按钮为不可点击状态
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      // 改变点赞按钮为可点击状态
      article.favoriteDisabled = false
    }
  }
};
</script>

<style>
</style>