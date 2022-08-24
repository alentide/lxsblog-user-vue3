<template>
  <div class="user-page-content-x">
    <Loading>
      <a-layout>
        <a-layout-content class="article-content" style="padding: 20px">
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

          <div class="bottom-comment-x" v-if="!visible">
            <Comments />
          </div>
        </a-layout-content>
        <a-layout-sider
          v-show="!sider.collapsed"
          breakpoint="lg"
          collapsed-width="0"
          class="sider"
          :width="300"
          v-model:collapsed="sider.collapsed"
        >
          <a-affix :style="{ width: 'auto' }" :offset-top="74">
            <div class="sider-content-x">
              <a-page-header class="back" title="返回" @back="$router.back" />
              <a-anchor>
                <CatalogueList :catalogueList="catalogueList" />
              </a-anchor>

              <div class="my40">
                <a-button-group>
                  <a-button type="primary">
                    <template #icon><EyeOutlined /></template
                    >{{ article.viewNum }}</a-button
                  >
                  <a-button type="primary" @click="showDrawer">
                    <template #icon><MessageOutlined /></template
                    >{{ article.commentNum }}</a-button
                  >
                </a-button-group>

                <ArticleScore
                  class="my10"
                  v-if="article.id"
                  :article="article"
                />
              </div>
            </div>
          </a-affix>
        </a-layout-sider>
      </a-layout>

      <a-drawer
        :width="500"
        title="评论"
        :placement="placement"
        v-model:visible="visible"
        @close="onClose"
        class="drawer-x"
        :bodyStyle="{
          padding: 0,
        }"
      >
        <Comments />
      </a-drawer>
    </Loading>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArticleDetail",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import { EyeOutlined, MessageOutlined } from "@ant-design/icons-vue";
import {
  nextTick,
  onMounted,
  ref,
  reactive,
  onActivated,
  provide,
  type Ref,
} from "vue";
import Loading from "@/components/feedback/Loading.vue";

import Comments from "@/components/comment/Comments.vue";

import CatalogueList from "@/components/article/CatalogueList.vue";

import type { DrawerProps } from "ant-design-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { addArticleViewNum, useArticle } from "@/modules/article";
import { useRoute } from "vue-router";

interface Link {
  href: string;
  title: string;
  level: 1 | 2 | 3 | 4;
  parent?: Link;
  children?: Link[];
}

interface Catalogue {
  text: string;
  level: 1 | 2 | 3 | 4;
}

const placement = ref<DrawerProps["placement"]>("right");
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

const article = useArticle();

provide("loading", article);

const route = useRoute();

const refresh = () => {
  const { id } = route.params as {
    id: string | undefined;
  };
  if (!id) return;
  article.initAsync(+id);
  addArticleViewNum(+id);
};

// onActivated(refresh);
onMounted(refresh);

//生成文章目录
// md-content

const catalogueList: Ref<Link[]> = ref([]);

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
    e.preventDefault();
  };
});

let links: Link[] = [];
let lastLink = () => links.slice(-1)[0];
const onGetCatalog = (e: Catalogue[]) => {
  const parentAddItem = (link: Link) => {
    const parent = link.parent;
    if (!parent) return;
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(link);
  };

  const e2: Link[] = e.map((m) => ({
    href: "#" + m.text,
    title: m.text,
    level: m.level,
  }));
  links = [];
  e2.forEach((link) => {
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

  catalogueList.value = links.filter((m) => !m.parent);
};
</script>

<style scoped lang="scss">
.back {
  padding: 10px 0;
  font-weight: normal;
}
.article-content {
  background: #fff;
  z-index: 10;
}
.article-cover-image {
  width: 80%;
  height: 200px;
  object-fit: contain;
}

.article-title {
  text-align: center;
}

.sider {
  // padding-top: 100px;
  margin-left: 10px;
  background-color: #f0f2f5;
}

.drawer-x {
}

.bottom-comment-x {
}

.sider-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sider-content-x {
  // margin-right: 20px;
  padding: 0 20px 20px;
  background: #fff;
}

@media screen and (min-width: 992px) {
  .bottom-comment-x {
    display: none;
  }
}

// ::v-deep(#md-editor-v3){

// /* 自动编号 */
// /* reset h2 counter to -1 when meet a h1 element */
// h1 {
//     counter-reset: h2Counter -1;
// }
// /* insert number before h2 element */
// h2:before {
//     content: counter(h2Counter)'. '
// }
// /* increase h2 counter and reset h3 counter when meet a h2 element */
// h2 {
//     counter-increment: h2Counter;
//     counter-reset: h3Counter;
// }
// h3:before {
//     content: counter(h2Counter) '.' counter(h3Counter) ' '
// }
// h3 {
//     counter-increment: h3Counter;
// }
// h4:before {
//     content: counter(h2Counter) '.' counter(h3Counter) '.' counter(h4Counter) ' '
// }
// h4 {
//     counter-increment: h4Counter;
// }
// }


</style>

<style>
body {
  overflow: visible !important;
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

.bottom-comment-x {
  height: calc(100vh - 55px);
}



</style>
