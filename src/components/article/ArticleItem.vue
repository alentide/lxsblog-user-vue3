<template>
  <a-list-item  style="position: relative">
    <template #actions>
      <span><EyeOutlined class="mr3" />{{ article.viewNum }}</span>
      <span><MessageOutlined class="mr3" />{{ article.commentNum }}</span>
      <span><ArticleScore :article="article" /></span>
    </template>
    <template #extra>
      <img
        class="article-coverImage"
        style="object-fit: contain"
        v-if="article.coverImage?.src"
        alt="logo"
        :src="article.coverImage.src"
      />
    </template>
    <a-list-item-meta :description="article.summary">
      <template #title>
        <RouterLink :to="'/user/article/' + article.id">{{ article.title }}</RouterLink>
      </template>
    </a-list-item-meta>

    <div class="ellipsis_2" style="width: 100%">
      {{ article.content }}
    </div>

    <span
      class="txtr"
      style="font-size: 12px; position: absolute; right: 0; bottom: 14px"
      >{{ article.firstReleaseTime }}</span
    >

    <a-tag class="my4" color="rgba(0,0,0,0.2)" v-if="article.category">{{
      article.category.name
    }}</a-tag>
    <a-tag class="my4" color="rgba(0,0,0,0.2)" v-for="tag in article.tags">{{
      tag.name
    }}</a-tag>
  </a-list-item>
</template>

<script setup lang="ts">
import type { useArticle } from "@/modules/article";
import {
  EyeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";


import { toRefs,toRef,reactive, computed } from "vue";

const props = defineProps<{
  article: ReturnType<typeof useArticle>;
}>();

// const articleRef = toRef(props,'article');
// const article = reactive(articleRef)

const article = toRef(props,'article')
</script>

<style scoped lang="scss">

.ellipsis_2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

.article-coverImage{
  width: 100%;
  max-height: 100px;
}

</style>
