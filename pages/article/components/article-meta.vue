<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{
      active: article.author.following
    }">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{
      active: article.favorited
    }">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <button class="btn btn-sm btn-outline-secondary" @click="clickEdit">
      <i class="ion-edit"></i>
      &nbsp;  Edit Article
    </button>
    <button class="btn btn-sm btn-outline-danger" @click="clickDelete">
      <i class="ion-trash-a"></i>
      &nbsp;  Delete Article
    </button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    clickEdit () {
      this.$router.push(`/editor/${this.article.slug}`)
    },
    clickDelete () {
      if (!confirm('Are you sure you want to delete this article?')) return
      this.deleteArticle()
    },
    // 删除文章
    deleteArticle () {
      deleteArticle(this.$route.params.slug).then(response => {
        alert('delete article successed')
        this.$router.push('/')
      }).catch(error => {
        alert('delete article failed')
      })
    }
  }
}
</script>

<style>

</style>