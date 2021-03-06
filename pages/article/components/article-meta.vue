<template>
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
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
      @click="onFollow"
      :disabled="isOnFollowing"
      v-if="user && user.username !== article.author.username"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? "unFollow" : "Follow" }}
      {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
      @click="onFavorite"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="clickEdit"
      v-if="user && user.username === article.author.username"
    >
      <i class="ion-edit"></i>
      &nbsp; Edit Article
    </button>
    <button
      class="btn btn-sm btn-outline-danger"
      @click="clickDelete"
      v-if="user && user.username === article.author.username"
    >
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
import { addFavorite, deleteFavorite, deleteArticle } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOnFollowing: false,
      isOnFavorite: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    clickEdit() {
      this.$router.push(`/editor/${this.article.slug}`);
    },
    clickDelete() {
      if (!confirm("Are you sure you want to delete this article?")) return;
      this.deleteArticle();
    },
    // 删除文章
    deleteArticle() {
      deleteArticle(this.$route.params.slug)
        .then((response) => {
          alert("delete article successed");
          this.$router.push("/");
        })
        .catch((error) => {
          alert("delete article failed");
        });
    },
    // 关注操作
    async onFollow() {
      // 改变关注按钮为不可点击状态
      this.isOnFollowing = true;
      if (this.article.following) {
        // 取消关注
        await deleteFollow(this.article.author.username);
        this.article.author.following = false;
      } else {
        // 添加关注
        await addFollow(this.article.author.username);
        this.article.author.following = true;
      }
      // 改变关注按钮为可点击状态
      this.isOnFollowing = false;
    },
    // 点赞操作
    async onFavorite () {
      // 改变点赞按钮为不可点击状态
      this.isOnFavorite = true
      if (this.article.favorited) {
        // 取消点赞
        await deleteFavorite(this.article.slug)
        this.article.favorited = false
        this.article.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFavorite(this.article.slug)
        this.article.favorited = true
        this.article.favoritesCount += 1
      }
      // 改变点赞按钮为可点击状态
      this.isOnFavorite = false
    }
  },
};
</script>

<style>
</style>