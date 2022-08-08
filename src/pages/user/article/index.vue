<template>
  <a-layout class="view-x">
    <!-- <a-layout-header>Header</a-layout-header> -->
    <a-layout>
      <a-layout-content class="article-list-x" style="padding: 20px">
        <a-carousel>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
        <a-list
          class="articles-x"
          item-layout="vertical"
          size="default"
          :data-source="list"
          :loading="loading"
        >
          <template #renderItem="{ item }">
            <a-list-item :key="item.id" style="position: relative">
              <template #actions>
                <span><EyeOutlined class="mr3" />{{ item.viewNum }}</span>
                <span
                  ><MessageOutlined class="mr3" />{{ item.commentsNum }}</span
                >
                <span><ArticleScore :article="item" /></span>
              </template>
              <template #extra>
                <img
                  style="object-fit: contain"
                  v-if="item.coverImage?.src"
                  width="272"
                  height="120"
                  alt="logo"
                  :src="item.coverImage.src"
                />
              </template>
              <a-list-item-meta :description="item.summary">
                <template #title>
                  <RouterLink :to="'article/' + item.id">{{
                    item.title
                  }}</RouterLink>
                </template>
              </a-list-item-meta>

              <div class="ellipsis_2" style="width: 100%">
                {{ item.content }}
              </div>

              <span
                class="txtr"
                style="
                  font-size: 12px;
                  position: absolute;
                  right: 0;
                  bottom: 14px;
                "
                >{{ item.createTime }}</span
              >

              <a-tag class="my4" color="rgba(0,0,0,0.2)" v-if="item.category">{{
                item.category.name
              }}</a-tag>
              <a-tag
                class="my4"
                color="rgba(0,0,0,0.2)"
                v-for="tag in item.tags"
                >{{ tag.name }}</a-tag
              >
            </a-list-item>
          </template>
        </a-list>
      </a-layout-content>

      <a-layout-sider
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
                :ellipsis="{row:1,tooltip:article.title}"
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
                :ellipsis="{row:1,tooltip:article.title}"
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
                :ellipsis="{row:1,tooltip:article.title}"
                :content="article.title"
            /></RouterLink>
          </a-card>
        </div>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer class="footer">
      <div style="margin-right: 300px">
        <ListLoading v-if="homeArticleList.list.value.length" />
      </div>
    </a-layout-footer>
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
.ellipsis_2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.articles-x {
  width: 100%;
  height: 100%;
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
