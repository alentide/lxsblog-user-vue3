<template>
  <div>
    <a-form :model="form" name="basic" autocomplete="off" @finish="save">
      <a-form-item
        label="标签名字"
        name="name"
        :rules="[{ required: true, message: '标签名字不能为空' }]"
      >
        <a-input v-model:value="form.name" placeholder="请输入标签名字" />
      </a-form-item>
      <a-form-item>
        <a-button :loading="loading" type="primary" html-type="submit"
          >保存</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { useTagNewForm } from '@/modules/tag/useTagNewForm';
import { inject } from 'vue';
const {form,save,loading}=inject('tagForm',()=>useTagNewForm(),true)
</script>

<style scoped></style>
