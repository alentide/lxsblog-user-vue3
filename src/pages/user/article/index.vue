<template>
  <div>
    <a-carousel :after-change="onChange">
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
        <a-list-item :key="item.id">
          <template #actions>
            <span><EyeOutlined class="mr3" />{{item.viewNum}}</span>
            <span><MessageOutlined class="mr3" />{{item.commentsNum}}</span>
            <span
              ><ArticleScore :article="item"/></span>
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
          <a-tag class="my4" color="rgba(0,0,0,0.2)" v-if="item.category">{{
            item.category.name
          }}</a-tag>
          <a-tag class="my4" color="rgba(0,0,0,0.2)" v-for="tag in item.tags">{{
            tag.name
          }}</a-tag>
        </a-list-item>
      </template>
    </a-list>
    <ListLoading v-if="homeArticleList.list.value.length" />
    <!-- <ListLoadMore /> -->
  </div>
</template>

<script setup lang="ts">
import { getHomeArticleList, scoreArticle } from "@/modules/article/index.js";
import {
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref, type Ref } from "vue";
import ListLoadMore from "@/components/list/ListLoadMore.vue";
import ListLoading from "@/components/list/ListLoading.vue";
import ListEmpty from "@/components/list/ListEmpty.vue";
import { onReachBottom } from "@/modules/list/index.js";

const homeArticleList = getHomeArticleList();
const { list, loading, nextPage } = homeArticleList;

onMounted(homeArticleList.refresh);
onReachBottom(nextPage);


</script>

<style scoped lang="scss">
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
</style>
