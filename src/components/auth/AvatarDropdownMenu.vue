<template>
  <div style="align-items: center; display: flex">
    <a-dropdown placement="bottomRight">
      <a-avatar style="flex-shrink: 0; margin-left: 20px" :size="40">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      
      <template #overlay>
        <a-menu v-if="auth.isLogin">
          <a-menu-item key="login">
            <a href="javascript:;" @click="auth.logout">退出</a>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="auth.isTourist">
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
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { auth, loginModal } from "@/modules/auth";


</script>

<style scoped></style>
