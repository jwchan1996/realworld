<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagsStr"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="createArticle"
                :disabled="isPublishing"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'

export default {
  // 在路由匹配组件渲染之前会先执行中间件
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      title: '',
      description: '',
      body: '',
      tagsStr: '',
      // 正在发布状态
      isPublishing: false
    }
  },
  methods: {
    async createArticle () {
      this.isPublishing = true
      const { data } = await createArticle({
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagsStr.split(',')
        }
      })
      this.isPublishing = false
      this.$router.push('/')
    }
  }
};
</script>

<style>
</style>