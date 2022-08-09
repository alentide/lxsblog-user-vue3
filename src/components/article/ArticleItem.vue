<template>
  <a-list-item :key="article.id" style="position: relative">
    <template #actions>
      <span><EyeOutlined class="mr3" />{{ article.viewNum }}</span>
      <span><MessageOutlined class="mr3" />{{ article.commentNum }}</span>
      <span><ArticleScore :article="article" /></span>
    </template>
    <template #extra>
      <img
        style="object-fit: contain"
        v-if="article.coverImage?.src"
        width="272"
        height="120"
        alt="logo"
        :src="article.coverImage.src"
      />
    </template>
    <a-list-item-meta :description="article.summary">
      <template #title>
        <RouterLink :to="'article/' + article.id">{{ article.title }}</RouterLink>
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
  StarOutlined,
  LikeOutlined,
  EyeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";


import { toRefs,reactive } from "vue";

const props = defineProps<{
  article: ReturnType<typeof useArticle>;
}>();

const { article:articleRef } = toRefs(props);
const article = reactive(articleRef)
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

</style>
