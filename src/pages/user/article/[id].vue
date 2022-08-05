<template>
  <div>
    <a-layout>
      <a-layout-sider style="background: #fff; padding: 10px" :width="300">
        <a-affix :offset-top="100">
          <a-anchor>
            <CatalogueList  :catalogueList="catalogueList" />
          </a-anchor>

          <a-button-group>
            <a-button type="primary">
              <template #icon><StarOutlined /></template>1</a-button
            >
            <a-button type="primary">
              <template #icon><LikeOutlined /></template>2</a-button
            >
            <a-button type="primary" @click="showDrawer">
              <template #icon><MessageOutlined /></template>3</a-button
            >
          </a-button-group>
        </a-affix>
      </a-layout-sider>
      <a-layout-content class="article-content" style="padding: 10px">
        <div class="article-title">
          <h1>{{ article.title.value }}</h1>
          <img
            v-if="article.coverImage?.value?.src"
            class="article-cover-image"
            :src="article.coverImage?.value?.src"
            alt=""
          />
        </div>
        <md-editor
          @onGetCatalog="onGetCatalog"
          v-model="article.content.value"
          previewOnly
        />
        /></a-layout-content
      >
    </a-layout>

    <a-drawer
      :width="500"
      title="评论"
      :placement="placement"
      :visible="visible"
      @close="onClose"
    >
      <!-- <template #extra>
        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onClose">Submit</a-button>
      </template> -->
      <Comments />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { nextTick, onMounted, ref } from "vue";
import Comments from "./components/Comments.vue";

import CatalogueList from "@/components/article/CatalogueList.vue";

import type { DrawerProps } from "ant-design-vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useArticle } from "@/modules/article";
import { useRoute } from "vue-router";

const placement = ref<DrawerProps["placement"]>("left");
const visible = ref<boolean>(false);

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

const source = `11111111123213123大幅度十分士大夫十分犯得上地方的上述代码
\`\`\`mermaid
flowchart TD 
  Start --> Stop
\`\`\`
\`\`
意思是？发`;

const article = useArticle();

const route = useRoute();

onMounted(() => {
  article.initAsync(route.params.id);
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

const render = ref(false);

render.value = true;
onMounted(() => {
  setTimeout(() => {
    render.value = true;
  }, 4000);
});

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
// onMounted(() => {
//         const dom = document.querySelector(".md-content");
//       if (!dom) return;
//       console.log("dom", dom);

//       const forEachElement = (
//         dom: Element,
//         parent: Element | null,
//         callback: (ele: Element) => void
//       ) =>
//         ([] as Element[]).forEach.call(dom.children, (ele) => {
//           console.log("ele.tagName", ele, ele.children && ele.children.length);
//           if (ele.children && ele.children.length) {
//             forEachElement(ele, dom, callback);
//           }
//         });

//       let flatElements = [];
//       forEachElement(dom, null, (ele) => {
//         if (!ele.tagName.toLocaleLowerCase().startsWith("h")) return;
//         flatElements.push({
//           element: ele,
//           parent: dom,
//         });
//       });

//       console.log("flatElements", flatElements);
// });
</script>

<style scoped lang="scss">
.article-content {
  background: #fff;
}
.article-cover-image {
  width: 80%;
  height: 200px;
  object-fit: cover;
}

.article-title {
  text-align: center;
}
</style>

<style>
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
</style>
