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
          <a-menu-item key="logout">
            <a href="javascript:;" @click="loginModal.show">登录</a>
          </a-menu-item>
          <a-menu-item key="register">
            <a href="javascript:;">注册</a>
          </a-menu-item>
        </a-menu>
        <a-menu v-else-if="auth.isAdmin.value">
          <a-menu-item key="logout">
            <a href="javascript:;" @click="auth.logout">退出</a>
          </a-menu-item>
          <a-menu-item key="register">
            <RouterLink to="/admin">管理</RouterLink>
          </a-menu-item>
        </a-menu>
        
        <!-- <a-menu v-if="auth.isTourist">
          <a-menu-item key="logout">
            <a href="javascript:;" @click="loginModal.show">登录</a>
          </a-menu-item>
          <a-menu-item key="register">
            <a href="javascript:;">注册</a>
          </a-menu-item>
        </a-menu> -->
        <!-- <a-menu v-else-if="auth.isAdmin.value">
          <a-menu-item>
            <a  @click.prevent="auth.logout">退出</a>
          </a-menu-item>
          <a-menu-item>
            <RouterLink to="/admin">管理</RouterLink>
          </a-menu-item>
        </a-menu> -->

      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { auth, loginModal } from "@/modules/auth";



</script>

<style scoped></style>
