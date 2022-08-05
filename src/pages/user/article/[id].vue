<template>
  <div>
    <a-layout>
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        class="sider"
        :width="300"
        v-model:collapsed="sider.collapsed"
      >
        <div class="sider-content-x">
          <a-affix
            :style="{ width: 'auto' }"
            :offset-top="100"
            style="padding-left: 20px"
          >
            <a-anchor>
              <CatalogueList :catalogueList="catalogueList" />
            </a-anchor>

            <a-button-group class="my40">
              <a-button type="primary">
                <template #icon><EyeOutlined /></template>{{article.viewNum}}</a-button
              >
              <a-button type="primary" @click="showDrawer">
                <template #icon><MessageOutlined /></template>1</a-button
              >
              <ArticleScore class="ml10" :article="article" />
            </a-button-group>
          </a-affix>
        </div>
      </a-layout-sider>
      <a-layout-content class="article-content" style="padding: 10px">
        <div class="article-title">
          <h1>{{ article.title }}</h1>
          <p class="article-summary">{{ article.summary }}</p>
          <img
            v-if="article.coverImage?.src"
            class="article-cover-image"
            :src="article.coverImage?.src"
            alt=""
          />
        </div>
        <md-editor
          @onGetCatalog="onGetCatalog"
          v-model="article.content"
          previewOnly
        />
      </a-layout-content>
    </a-layout>

    <a-drawer
      :width="500"
      title="评论"
      :placement="placement"
      v-model:visible="visible"
      @close="onClose"
    >
      <Comments />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import {
  StarOutlined,
  LikeOutlined,
  EyeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { nextTick, onMounted, ref, reactive } from "vue";
import Comments from "./components/Comments.vue";

import CatalogueList from "@/components/article/CatalogueList.vue";

import type { DrawerProps } from "ant-design-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { addArticleViewNum, useArticle } from "@/modules/article";
import { useRoute } from "vue-router";

const placement = ref<DrawerProps["placement"]>("left");
const visible = ref<boolean>(false);

const sider = reactive({
  collapsed: false,
});

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};


const article = reactive(useArticle());



const route = useRoute();

onMounted(() => {

  const {id} = route.params as {
    id: string |undefined
  }
  if(!id) return
  article.initAsync(id);
  addArticleViewNum(id)
});

//生成文章目录
// md-content

const catalogueList = ref([]);

class CatalogueItem {
  name = "";
  parent: CatalogueItem | undefined;
  constructor(name: string, parent: CatalogueItem) {
    this.name = name;
    this.parent = parent;
  }
}

onMounted(() => {
  window.onhashchange = (e) => {
    console.log("e.target", e);
    e.preventDefault();
  };
});

let links = [];
let lastLink = () => links.slice(-1)[0];
const onGetCatalog = (e) => {
  const parentAddItem = (link) => {
    const parent = link.parent;
    if (!parent) return;
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(link);
  };

  e = e.map((m) => ({ href: "#" + m.text, title: m.text, level: m.level }));
  links = [];
  console.log("e", e);
  e.forEach((link) => {
    if (!lastLink()) {
      links.push(link);
    } else {
      if (link.level > lastLink().level) {
        link.parent = lastLink();
        const parent = lastLink();
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(link);

        links.push(link);
      } else if (link.level === lastLink().level) {
        link.parent = lastLink()?.parent;

        parentAddItem(link);

        links.push(link);
      } else if (link.level < lastLink().level) {
        link.parent = lastLink()?.parent?.parent;

        parentAddItem(link);
        links.push(link);
      }
    }
  });

  console.log(
    "links",
    links.filter((m) => !m.parent)
  );
  catalogueList.value = links.filter((m) => !m.parent);
};
</script>

<style scoped lang="scss">
.article-content {
  background: #fff;
  z-index: 10;
}
.article-cover-image {
  width: 80%;
  height: 200px;
  object-fit: cover;
}

.article-title {
  text-align: center;
}

.sider {
  padding-top: 100px;
  background-color: #fff;
}

</style>

<style>

body {
  overflow: visible!important;
}
h1,
h2,
h3,
h4,
h5 {
  margin-top: calc(-100px + 1.4em) !important;
  padding-top: 100px;
}
/* h1:target,
h2:target,
h3:target,
h4:target,
h5:target {
  margin-top: calc(-100px + 1.4em);
  padding-top: 100px;
  color: blue;
} */

.article-summary {
  color: rgba(0, 0, 0, 0.3);
}
</style>
