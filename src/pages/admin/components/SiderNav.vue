<template>
  <a-menu
    v-model:selectedKeys="selectedKeys2"
    v-model:openKeys="openKeys"
    mode="inline"
    :style="{ height: '100%', borderRight: 0 }"
    @click="clickMenu"
  >
    <a-sub-menu key="article">
      <template #title>
        <span>
          <user-outlined />
          文章管理
        </span>
      </template>
      <a-menu-item key="/admin/article/edit">新建文章</a-menu-item>
      <a-menu-item key="/admin/article/list">文章列表</a-menu-item>
      <a-menu-item key="3">草稿箱</a-menu-item>
      <a-menu-item key="4">发布文章</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
        <span>
          <laptop-outlined />
          分类管理
        </span>
      </template>
      <a-menu-item key="5">新建分类</a-menu-item>
      <a-menu-item key="6">分类列表</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #title>
        <span>
          <notification-outlined />
          标签管理
        </span>
      </template>
      <a-menu-item key="5">新建标签</a-menu-item>
      <a-menu-item key="6">标签列表</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #title>
        <span>
          <notification-outlined />
          标签管理
        </span>
      </template>
      <a-menu-item key="5">新建标签</a-menu-item>
      <a-menu-item key="6">标签列表</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #title>
        <span>
          <notification-outlined />
          评论管理
        </span>
      </template>
      <a-menu-item key="5">评论列表</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #title>
        <span>
          <notification-outlined />
          用户管理
        </span>
      </template>
      <a-menu-item key="5">新建用户</a-menu-item>
      <a-menu-item key="5">用户列表</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup lang="ts">
import router from '@/router';

const clickMenu = ({ key }: { key: string }) => {
  router.push(key);
};
</script>

<style scoped></style>
