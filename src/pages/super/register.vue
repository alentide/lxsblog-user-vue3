<template>
  <div class="form-x">
    <a-form
    class="form"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="register"
    >
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <!-- <a-form-item name="remember">
      <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
    </a-form-item> -->

      <a-form-item>
        <a-button type="primary" :loading="loading" html-type="submit"
          >注册管理员</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useAdminPost } from "@/modules/http/index.js";
import { reactive } from "vue";
interface FormState {
  email: string;
  password: string;
  //   remember: boolean;
}
const formState = reactive<FormState>({
  email: "",
  password: "",
  //   remember: true,
});
const { loading, request } = useAdminPost("users/register/admin");

const register = () => request(formState);
</script>

<style scoped lang="scss">
.form-x {
  display: flex;
  justify-content: center;
}
.form{
  width: 30vw;
  min-width: 375px;
}
</style>
