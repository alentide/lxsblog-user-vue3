<template>
  <a-modal
    wrapClassName="login-form-x"
    v-model:visible="authModal.visible"
    centered
    :title="authModal.title"
    :footer="null"
  >
    <a-form
    :label-col="{ style: { width: '60px' }}"
      :model="authModal.form"
      name="basic"
      autocomplete="on"
      @finish="authModal.submit"
    >
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      >
        <a-input v-model:value="authModal.form.email" />
      </a-form-item>
      <a-form-item
        v-if="authModal.isRegister(authModal.form)"
        name="code"
        label="验证码"
        :rules="[{ required: true }]"
      >
        <div class="dpf aic">
          <a-input
            v-model:value="authModal.form.code"
            placeholder="请输入6位验证码"
          />
          <CodeSender :email="authModal.form.email" />
        </div>
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '密码为8到16位', min: 8, max: 16 }]"
      >
        <a-input-password :autocomplete="remember?'on':'off'" v-model:value="authModal.form.password" />
      </a-form-item>
      <a-form-item
      >
      <a-checkbox v-model:checked="remember">记住我</a-checkbox>
      </a-form-item>


      <a-form-item>
        <a-button
          type="primary"
          :loading="authModal.loading"
          html-type="submit"
          >{{ authModal.submitBtnName }}</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { authModal } from "@/modules/auth";
import { ref } from "vue";

const remember = ref(false)
</script>

<style scoped lang="scss"></style>
