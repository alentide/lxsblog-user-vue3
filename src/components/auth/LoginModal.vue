<template>
  <a-modal
    wrapClassName="login-form-x"
    v-model:visible="visible"
    centered
    title="登录"
    :footer="null"
  >
    <a-form :model="form" name="basic" autocomplete="on" @finish="()=>loginModal.login()">
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      >
        <a-input v-model:value="form.email" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="form.password" />
      </a-form-item>

      <!-- <a-form-item name="remember">
          <a-checkbox v-model:checked="form.remember"
            >Remember me</a-checkbox
          >
        </a-form-item> -->

      <a-form-item>
        <a-button type="primary" :loading="loading" html-type="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { loginModal } from "@/modules/auth/index.js";
import { onMounted } from "vue";

const { visible, form, loading} = loginModal;

</script>

<style scoped lang="scss"></style>
