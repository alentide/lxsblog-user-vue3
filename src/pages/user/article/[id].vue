<template>
  <div>
    <a-layout>
      <a-layout-sider style="background: #fff; padding: 10px" :width="300">
        <a-affix :offset-top="100">
          <a-steps progress-dot :current="2" direction="vertical">
            <a-step
              title="Finished"
              description="This is a description. This is a description."
            />
            <a-step
              title="Finished"
              description="This is a description. This is a description."
            />
            <a-step
              title="In Progress"
              description="This is a description. This is a description."
            />
            <a-step title="Waiting" description="This is a description." />
            <a-step title="Waiting" description="This is a description." />
          </a-steps>
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
            class="article-cover-image"
            :src="article.coverImage?.value?.src"
            alt=""
          />
        </div>
        <md-editor v-model="article.content.value" previewOnly />
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
import { onMounted, ref } from "vue";
import Comments from "./components/Comments.vue";

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
