<template>
  <div style="align-items: center; display: flex">
    <a-dropdown placement="bottomRight">
      <a-avatar style="flex-shrink: 0; margin-left: 20px" :size="40">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>

      <template #overlay>
        <a-menu v-if="auth.isTourist">
          <a-menu-item key="tip"> (游客身份) </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;" @click="authModal.showLogin">登录其他账号</a>
          </a-menu-item>
          <a-menu-item key="register">
            <a href="javascript:;" @click="authModal.showRegister"
              >注册为正式账号</a
            >
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="auth.isAdmin">
          <a-menu-item key="tip"> (管理员身份) </a-menu-item>
          <a-menu-item key="register">
            <RouterLink to="/admin">管理</RouterLink>
          </a-menu-item>
          <a-menu-item key="register">
            <RouterLink to="/user/profile">个人信息</RouterLink>
          </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;" @click="auth.logout">退出</a>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="auth.isUser">
          <a-menu-item key="tip"> (普通用户身份) </a-menu-item>
          <a-menu-item key="register">
            <RouterLink to="/user/profile">个人信息</RouterLink>
          </a-menu-item>
          <a-menu-item key="logout">
            <a href="javascript:;" @click="auth.logout">退出</a>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="!auth.isLogin">
          <a-menu-item key="logout">
            <a href="javascript:;" @click="authModal.showLogin">登录</a>
          </a-menu-item>
          <a-menu-item key="register">
            <a href="javascript:;" @click="authModal.showRegister">注册</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { auth, authModal } from "@/modules/auth";
</script>

<style scoped></style>
