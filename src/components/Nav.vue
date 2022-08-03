<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <a-row type="flex" justify="space-between" align="middle">
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
        <div style="align-items: center; display: flex">
          <a-dropdown placement="bottomRight">
            <a-avatar style="flex-shrink: 0; margin-left: 20px" :size="40">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <template #overlay>
              <a-menu>
                <a-menu-item key="login">
                  <a href="javascript:;" @click="loginModal.show">登录</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">退出</a>
                </a-menu-item>
                <a-menu-item>
                  <RouterLink to="/admin">管理</RouterLink>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>

    <LoginModal />
  </a-layout-header>
</template>

<script setup lang="ts">
import Logo from "@/assets/logo.png";
import LoginModal from "./auth/LoginModal.vue";
import { UserOutlined } from "@ant-design/icons-vue";

import { useNav } from "@/modules/nav/useNav";
import { ref } from "vue";
import { loginModal } from "@/modules/auth";

const nav = useNav();
const clickMenu = ({ key }: { key: string }) => {
  nav.go(key);
};

const selectedKeys = ref([]);

</script>

<style scoped lang="scss"></style>
