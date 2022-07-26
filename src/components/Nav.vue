<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">首页</a-menu-item>
      <a-menu-item key="2">文章</a-menu-item>
      <a-menu-item key="3">项目</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
