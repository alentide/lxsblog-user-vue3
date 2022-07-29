<template>
  <div>
    <!-- <a-row align="middle">
      <a-col>
        <a-button type="primary" shape="circle">
          <template #icon>+</template>
        </a-button>
      </a-col>
      <a-col :span="23">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item :key="item" v-for="item in 4">
            <a href="javascript:void(0)">item</a>
          </a-menu-item>
        </a-menu></a-col
      >
    </a-row> -->

    <a-form
      :model="form"
      name="basic"
      autocomplete="off"
      @finish="save"
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
        label="封面"
        name="coverImage.src"
        :rules="[{ type:'string',required: false, message: '请上传封面！',trigger:'change' }]"
      >
        <ImageUploader style="width:100%;height: 100px;" v-model="form.coverImage"/>
      </a-form-item>

      <a-form-item name="remember">
        <MdEditor class="editor-x" v-model="form.content" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" :loading="loading" html-type="submit">保存</a-button>
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
import ImageUploader from '@/components/base/ImageUploader.vue'

const useArticleForm = inject('useArticleForm',useArticleNewForm)
const {loading,form,save,fetch} = useArticleForm()
onMounted(fetch)
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
