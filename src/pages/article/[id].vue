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
      <a-layout-content style="padding: 10px">
        <Markdown :source="source"
      /></a-layout-content>
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
import { ref } from "vue";
import Comments from './components/Comments.vue'

import type { DrawerProps } from "ant-design-vue";

const placement = ref<DrawerProps["placement"]>("left");
const visible = ref<boolean>(false);

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};


const source = `# Hello World!
# Hello World!
# Hello World!
# Hello World!
# Hello World!# Hello World!
# Hello World!
# Hello World!
# Hello World!
# Hello World!# Hello World!
# Hello World!
# Hello World!
# Hello World!
# Hello World!# Hello World!
# Hello World!
# Hello World!
# Hello World!
# Hello World!# Hello World!
# Hello World!
# Hello World!
# Hello World!
# Hello World!`;
</script>

<style scoped></style>
