<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentInput"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" v-if="user" />
        <img src="https://ae01.alicdn.com/kf/U1615c605dcf74ca98186e1754ef329b1R.jpg" class="comment-author-img" v-else />
        <button class="btn btn-sm btn-primary" :disabled="isCommenting" @click="addComment">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from "@/api/article";
import { mapState } from 'vuex'

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      slug: this.$route.params.slug,
      commentInput: '',
      isCommenting: false
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    addComment () {
      this.isCommenting = true
      addComment(this.slug, {
        comment: {
          body: this.commentInput
        }
      }).then(response => {
        this.commentInput = ''
        this.getComments()
        this.isCommenting = false
      }).catch(error => {
        this.isCommenting = false
      })

    }
  }
};
</script>

<style>
</style>