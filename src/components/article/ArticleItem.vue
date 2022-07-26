<template>
  <a-list-item key="item.title">
    <template #actions>
      <span><StarOutlined />1</span>
      <span><LikeOutlined />1</span>
      <span><MessageOutlined />1</span>
    </template>
    <template #extra>
      <img
        width="272"
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    </template>
    <a-list-item-meta :description="item.description">
      <template #title>
        <RouterLink :to="item.href">{{ item.title }}</RouterLink>
      </template>
    </a-list-item-meta>

    <div class="ellipsis_2" style="width: 100%">
      {{ item.content }}
    </div>
  </a-list-item>
</template>

<script setup lang="ts">
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { toRefs } from "vue";

const props = defineProps<{
    item:{
        title: string,
        content:string,
        description:string,
    }
}>()

const {item} = toRefs(props)


</script>

<style scoped></style>
