<template>
  <div style="align-items: center; display: flex">
    <a-dropdown placement="bottomRight">
      <a-avatar style="flex-shrink: 0; margin-left: 20px" :size="40">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>

      <template #overlay>
        <a-menu v-if="auth.isTourist.value">
          <a-menu-item key="tip"> (游客身份) </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;" @click="loginModal.show">登录其他账号</a>
          </a-menu-item>
          <a-menu-item key="register">
            <a href="javascript:;">注册为正式账号</a>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="auth.isAdmin.value">
          <a-menu-item key="tip"> (管理员身份) </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;" @click="auth.logout">退出</a>
          </a-menu-item>
          <a-menu-item key="register">
            <RouterLink to="/admin">管理</RouterLink>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="auth.isUser.value">
          <a-menu-item key="tip"> (普通用户身份) </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;" @click="auth.logout">退出</a>
          </a-menu-item>
          <a-menu-item key="register">
            <RouterLink to="/admin">管理</RouterLink>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="!auth.isLogin.value">
          <a-menu-item key="logout">
            <a href="javascript:;" @click="loginModal.show">登录</a>
          </a-menu-item>
          <a-menu-item key="register">
            <a href="javascript:;" @click="loginModal.show">注册</a>
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
