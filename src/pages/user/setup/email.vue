<template>
  <div>
    <a-form
      :model="form"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="save"
      :label-col="{ style: { width: '60px' } }"
    >
      <a-form-item name="email" label="新邮箱" :rules="[{ required: true }]">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item name="code" label="验证码" :rules="[{ required: true }]">
        <div class="dpf aic">
          <a-input v-model:value="form.code" />
          <CodeSender :email="form.email"/>
        </div>
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
import { clone, pickAll } from "ramda";
import { reactive, toRef } from "vue";
import AvatarUploader from "@/components/image/AvatarUploader.vue";
import CodeSender from "../../../components/auth/CodeSender.vue";
import router from "@/router";

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
}

const form = reactive(
  clone<ProfileForm>(pickAll(["email", "code"], user.value))
);

const [loading, save] = loadingMethod(async () => {
  await userHttp.patch("/users/email", form);
  user.value = Object.assign(user.value, {
    email: form.email
  });
  router.replace('/user/setup')
});
</script>

<style scoped></style>
