<template>
  <a-layout-header :style="{ position: 'fixed',top: 0, zIndex: 100, width: '100%' }">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col
        :xs="{
          span: 20,
          pull: 2,
          push: 2,
        }"
        :sm="{
          span: 20,
          pull: 2,
          push: 2,
        }"
        :md="{
          span: 20,
          pull: 2,
          push: 2,
        }"
        :lg="{
          span: 20,
          pull: 2,
          push: 2,
        }"
        :xl="{
          span: 20,
          pull: 2,
          push: 2,
        }"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          @click="clickMenu"
        >
          <a-menu-item key="/"
            ><img :src="Logo" alt="" style="width: 30px; height: 30px"
          /></a-menu-item>
          <!-- <a-menu-item key="1">首页</a-menu-item> -->
          <a-menu-item key="/user/article">文章</a-menu-item>
          <a-menu-item key="/user/projects">项目</a-menu-item>
        </a-menu></a-col
      >
      <a-col>
        <AvatarDropdownMenu />
      </a-col>
    </a-row>

    <LoginModal />
  </a-layout-header>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png";
import LoginModal from "./auth/LoginModal.vue";
import AvatarDropdownMenu from "./auth/AvatarDropdownMenu.vue";

import { useNav } from "@/modules/nav/useNav";
import { ref } from "vue";

const nav = useNav();
const clickMenu = ({ key }: { key: string }) => {
  nav.go(key);
};

const selectedKeys = ref([]);
</script>

<style scoped lang="scss"></style>
