<template>
  <a-layout-header
    :style="{ position: 'fixed', top: 0, zIndex: 100, width: '100%' }"
  >
    <div class="dpf jcc">
      <a-row
        style="max-width: 1000px;width: 100%;"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <a-col>
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

const nav = useNav();
const clickMenu = ({ key }: { key: string }) => {
  nav.go(key);
};

const route = useRoute();
const selectedKeys: Ref<string[]> = ref([]);
watch(
  () => route.fullPath,
  () => {
    selectedKeys.value = [route.fullPath];
  }
);
</script>

<style scoped lang="scss">
.search-icon {
  color: #fff;
}
</style>
