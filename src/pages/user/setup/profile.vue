<template>
  <div>
    <a-form
      :model="form"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="save"
    >
    <a-form-item name="avatar" label="头像" >
         <AvatarUploader 
          style="width: 100%; height: 100px"
          v-model="form.avatar"
        />
      </a-form-item>
      <a-form-item name="nickname" label="昵称" :rules="[{ required: true }]">
        <a-input v-model:value="form.nickname" />
      </a-form-item>
      <a-form-item name="username" label="用户名" :rules="[{ required: true }]">
        <a-input v-model:value="form.username" />
      </a-form-item>
      <a-form-item >
        <a-button type="primary" :loading="loading" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { auth } from "@/modules/auth";
import { userHttp } from "@/modules/http";
import { loadingMethod } from "@/modules/loading";
import { use } from "chai";
import { clone, pickAll } from "ramda";
import { reactive, toRef } from "vue";
import AvatarUploader from "@/components/image/AvatarUploader.vue";

const user = toRef(auth, "user");

const layout = {
  //   labelCol: { span: 8 },
  //   wrapperCol: { span: 16 },
};

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
  username: string
  nickname: string
  avatar: string
}


const form = reactive(clone<ProfileForm>(pickAll(['username','nickname','avatar'],user.value)));


const [loading,save] = loadingMethod(async ()=>{
   await userHttp.patch('/users/profile',form)
   user.value = Object.assign(user.value,form)
})


</script>

<style scoped></style>
