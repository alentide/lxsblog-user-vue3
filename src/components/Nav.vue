<template>
  <a-layout-header
    class="header"
    :style="{
      position: 'fixed',
      top: 0,
      zIndex: nav.ZIndex,
      width: '100%',
      background,
      height: '50px',
    }"
  >
    <div class="">
      <a-row
        style="width: 100%"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <a-col
          :xs="{
            push: 1,
          }"
          :sm="{
            push: 1,
          }"
          :md="{
            push: 2,
          }"
          :lg="{
            push: 2,
          }"
          :xl="{
            push: 3,
          }"
        >
          <a-menu
            v-model:selectedKeys="selectedKeys"
            :theme="theme"
            mode="horizontal"
            :style="{ lineHeight: '50px', background }"
            @click="clickMenu"
          >
            <a-menu-item key="/"
              ><img :src="Logo" alt="" style="width: 30px; height: 30px"
            /></a-menu-item>
            <!-- <a-menu-item key="1">首页</a-menu-item> -->
            <a-menu-item key="/user/article">文章</a-menu-item>
            <a-menu-item key="/user/time-line">时间线</a-menu-item>
            <!-- <a-menu-item key="/user/projects">项目</a-menu-item> -->
          </a-menu></a-col
        >
        <a-col
          :xs="{
            pull: 1,
          }"
          :sm="{
            pull: 1,
          }"
          :md="{
            pull: 2,
          }"
          :lg="{
            pull: 2,
          }"
          :xl="{
            pull: 3,
          }"
        >
          <div class="nav-right dpf jcc aic">
            <a-button type="primary" shape="circle">
              <template #icon
                ><SearchOutlined
                  class="search-icon"
                  @click="$router.push('/user/search')"
              /></template>
            </a-button>
            <AvatarDropdownMenu />
          </div>
        </a-col>
      </a-row>
    </div>

    <LoginModal />
  </a-layout-header>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png";
import LoginModal from "./auth/LoginModal.vue";
import AvatarDropdownMenu from "./auth/AvatarDropdownMenu.vue";
import { SearchOutlined } from "@ant-design/icons-vue";

import { useNav } from "@/modules/nav/useNav";
import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";

const background = ref("#fff");

const theme = ref('light')
const nav = useNav();
const clickMenu = ({ key }: { key: string }) => {
  nav.go(key);
};

const route = useRoute();
const selectedKeys: Ref<string[]> = ref([]);
watch(
  () => route.path,
  () => {
    selectedKeys.value = [route.path];

    if (
      route.path.startsWith("/admin") ||
      route.path.startsWith("/user/setup")
    ) {
      background.value = "#112437";
      theme.value = 'dark'
    } else {
      background.value = "#fff";
      theme.value = 'light'
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
.search-icon {
  color: #fff;
}
</style>
