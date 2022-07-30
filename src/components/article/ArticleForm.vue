<template>
  <div>

    <a-form
      :model="form"
      name="basic"
      autocomplete="off"
      @finish="endEdit"
      class="form-x"
    >
      <a-form-item
        label="标题"
        name="title"
        :rules="[{ required: true, message: '请输入标题' }]"
      >
        <a-input v-model:value="form.title" />
      </a-form-item>

      <a-form-item
        label="概述"
        name="summary"
        :rules="[{ required: true, message: '请输入概述' }]"
      >
        <a-input v-model:value="form.summary" />
      </a-form-item>
      <a-form-item
        label="分类"
        name="category"
      >
        <CategorySelector v-model="form.category" />
      </a-form-item>

      <a-form-item
        label="标签"
        name="tag"
      >
        <TagSelector v-model="form.tags" />
      </a-form-item>
      
      <a-form-item
        label="封面"
        name="coverImage.src"
        :rules="[
          {
            type: 'string',
            required: false,
            message: '请上传封面！',
            trigger: 'change',
          },
        ]"
      >
        <ImageUploader
          style="width: 100%; height: 100px"
          v-model="(form.coverImage as null)"
        />
      </a-form-item>

      <a-form-item name="remember">
        <MdEditor class="editor-x" v-model="form.content" />
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
import EasyMDE from "easymde";
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  type Ref,
} from "vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useArticleNewForm } from "@/modules/article/useArticleForm";
import ImageUploader from "@/components/base/ImageUploader.vue";
import useAdminTabs from "@/modules/adminTabs/useAdminTabs";
import CategorySelector from '@/components/category/CategorySelector.vue'
import TagSelector from '@/components/tag/TagSelector.vue'
const { currentTab } = useAdminTabs();
const adminTabs = useAdminTabs();


const { loading, form, save, fetch } = inject(
  "articleForm",
  () => useArticleNewForm(),
  true
);

const endEdit = async () => {
  await save();
  adminTabs.pop();
};

watch(
  () => form.value.title,
  (newVal: string) => {
    if (currentTab.value) {
      currentTab.value.title = (newVal || "无标题")+'-编辑文章';
    }
  }
);

onMounted(fetch);

// onBeforeUnmount(save);
</script>

<style scoped lang="scss">
.form-x {
  height: 100%;
  overflow-y: auto;
}
.text-area {
  height: 100%;
  width: 100%;
  resize: none;
  outline: none;
  border: none;
}
.editor-x {
  min-height: 50vh;
}

.avatar-uploader {
  width: 100%;
  height: 100px;
}
::v-deep(.ant-upload.ant-upload-select-picture-card) {
  width: 100%;
  height: 100px;
}
</style>