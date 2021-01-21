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
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFollow, deleteFollow, getProfile } from "@/api/user";
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  data () {
    return {
      // 当前个人主页用户信息
      profile: {
        username: '',
        bio: '',
        image: '',
        following: false
      },
      isOnFollowing: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getProfile()
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
  }
};
</script>

<style>
</style>