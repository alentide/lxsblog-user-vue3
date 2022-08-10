<template>
  <a-layout class="view-x">
    <!-- <a-layout-header>Header</a-layout-header> -->
    <a-layout>
      <a-layout-content class="article-list-x" style="padding: 20px">
        <!-- <a-carousel>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel> -->

        <!-- <ArticleSearch /> -->

        <a-list
          class="articles-x"
          item-layout="vertical"
          size="default"
          :data-source="list"
          :loading="loading"
        >
          <template #renderItem="{ item }">
            <ArticleItem :article="item" />
          </template>
          <template #footer>
            <ListLoading v-if="homeArticleList.list.value.length" />
          </template>
        </a-list>
      </a-layout-content>

      <a-layout-sider
        v-show="!sider.collapsed"
        breakpoint="lg"
        collapsed-width="0"
        :width="300"
        class="sider-x"
        v-model:collapsed="sider.collapsed"
      >
        <div class="sider-content-x">
          <a-card title="最高阅读" :bordered="false" class="mb10">
            <RouterLink
              class="article-link"
              :to="'article/' + article.id"
              v-for="article in highestViewNumArticleList.data"
            >
              <a-typography-paragraph
                :ellipsis="{ row: 1, tooltip: article.title }"
                :content="article.title"
            /></RouterLink>
          </a-card>
          <a-card title="最高评分" :bordered="false" class="mb10">
            <RouterLink
              class="article-link"
              :to="'article/' + article.id"
              v-for="article in highestViewNumArticleList.data"
            >
              <a-typography-paragraph
                :ellipsis="{ row: 1, tooltip: article.title }"
                :content="article.title"
            /></RouterLink>
          </a-card>
          <a-card title="最多评论" :bordered="false" class="mb10">
            <RouterLink
              class="article-link"
              :to="'article/' + article.id"
              v-for="article in highestViewNumArticleList.data"
            >
              <a-typography-paragraph
                :ellipsis="{ row: 1, tooltip: article.title }"
                :content="article.title"
            /></RouterLink>
          </a-card>
        </div>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer class="footer"> </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { getHomeArticleList } from "@/modules/article/index.js";
import { EyeOutlined, MessageOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, type Ref, reactive } from "vue";
import ListLoading from "@/components/list/ListLoading.vue";
import { onReachBottom } from "@/modules/list/index.js";
import { useUserGet } from "@/modules/http";
import type { ArticleDfe } from "@/modules/article/article.interfaces";
import ArticleSearch from "@/components/article/ArticleSearch.vue";

import ArticleItem from "@/components/article/ArticleItem.vue";

const homeArticleList = getHomeArticleList();
const { list, loading, nextPage } = homeArticleList;

onMounted(homeArticleList.refresh);
onReachBottom(nextPage);

const sider = reactive({
  collapsed: false,
});

const highestViewNumArticleList = useUserGet<ArticleDfe[]>(
  "articles/high-view-num"
);
onMounted(highestViewNumArticleList.request);

const highestScoreArticleList = useUserGet<ArticleDfe[]>("articles/high-score");
onMounted(highestScoreArticleList.request);

const hightestCommentNumArticleList = useUserGet<ArticleDfe[]>(
  "articles/high-comment-num"
);
onMounted(hightestCommentNumArticleList.request);
</script>

<style scoped lang="scss">
.view-x {
  padding: 0;
}
.footer {
  background-color: #f0f2f5;
}
.article-list-x {
  background-color: #fff;
}

.articles-x {
  width: 100%;
  height: 100%;
}

.sider-x {
  background-color: #f0f2f5;
  margin: 0 10px;
}

.article-link {
  color: #000;
  display: block;
  margin: 4px;
  &:hover {
    opacity: 0.8;
  }
}
</style>
