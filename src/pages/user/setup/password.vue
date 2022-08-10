<template>
  <div>
    <a-form
      :model="form"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="save"
    >
      <a-form-item name="email" label="邮箱" :rules="[{ required: true }]">
        <a-input disabled v-model:value="form.email" />
      </a-form-item>
      <a-form-item name="code" label="验证码" :rules="[{ required: true }]">
        <div class="dpf aic">
          <a-input v-model:value="form.code" placeholder="请输入6位验证码" />
          <CodeSender :email="form.email"/>
        </div>
      </a-form-item>
      <a-form-item name="password" label="密码" :rules="[{ required: true }]">
        <a-input-password v-model:value="form.password" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" :loading="loading" html-type="submit"
          >保存</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { auth } from "@/modules/auth";
import { userHttp } from "@/modules/http";
import { loadingMethod } from "@/modules/loading";
import router from "@/router";
import { clone, pickAll } from "ramda";
import { reactive, toRef } from "vue";
import CodeSender from "../../../components/auth/CodeSender.vue";

const user = toRef(auth, "user");

const validateMessages = {
  required: "${label} 是必填项!",
  types: {
    email: "${label} 必须是合法的邮箱!",
    number: "${label} 必须是一个数字!",
  },
  number: {
    range: "${label} 应当在 ${min} 和 ${max} 之间！",
  },
};

interface ProfileForm {
  email: string;
  code: number;
  password:string
}

const form = reactive(
  clone<ProfileForm>(pickAll(["email", "code",'password'], user.value))
);

const [loading, save] = loadingMethod(async () => {
  await userHttp.patch("/users/password", form);
  router.replace('/user/setup')
//   user.value = Object.assign(user.value);
});
</script>

<style scoped></style>
