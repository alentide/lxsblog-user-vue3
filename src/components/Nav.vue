<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
    
      <a-menu-item key="1"><img :src="Logo" alt="" style="width: 30px;height:30px;" /></a-menu-item>
      <!-- <a-menu-item key="1">首页</a-menu-item> -->
      <a-menu-item key="2">文章</a-menu-item>
      <a-menu-item key="3">项目</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png'
</script>

<style scoped></style>
