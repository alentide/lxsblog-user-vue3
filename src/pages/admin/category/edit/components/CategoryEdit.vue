<template>
  <div>
    <a-form :model="form" name="basic" autocomplete="off" @finish="save">
      <a-form-item
        label="分类名字"
        name="name"
        :rules="[{ required: true, message: '分类名字不能为空' }]"
      >
        <a-input v-model:value="form.name" placeholder="请输入分类名字" />
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
import { useCategoryNewForm } from '@/modules/category/useCategoryNewForm';
import { inject } from 'vue';
const {form,save,loading}=inject('categoryForm',()=>useCategoryNewForm(),true)
</script>

<style scoped></style>
