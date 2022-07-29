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
        name="coverImageSrc"
        :rules="[{ type:'string',required: false, message: '请上传封面！',trigger:'change' }]"
      >
        <a-upload
          v-model:file-list="fileList"
          accept=".png,.jpg"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :customRequest="customRequest"
          @change="onChangeFileList"
          @drop="onDropInUploader"
        >
          <img
            class="avatar-uploader"
            v-if="form.coverImageSrc"
            :src="form.coverImageSrc"
            alt="avatar"
          />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>

      </a-form-item>

      <a-form-item name="remember">
        <MdEditor class="editor-x" v-model="form.content" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import EasyMDE from "easymde";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  type Ref,
} from "vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import { useArticleForm } from "@/modules/article/useArticleForm";
import { ImageUploader } from "@/modules/upload/ImageUploader";
import { file } from "@babel/types";

const { form, save } = useArticleForm();
const coverImageSrc = computed(() => fileList.value[0].url);

const loading = ref(false);
const fileList: Ref<any[]> = ref([]);

const onChangeFileList = (e: any) => {
  fileList.value = [e.file];
  console.log("e1", e);
};
const onDropInUploader = (e: any) => {
  console.log("e2", e);
};

const customRequest = async (e: { file: { uid: string; name: string } }) => {
  loading.value = true;
  const imageUploader = new ImageUploader();
  const client = await imageUploader.getClient();
  const res = await client.put(
    e.file.uid + "." + e.file.name.split(".").slice(-1)[0],
    e.file
  );

  loading.value = false;
  form.value.coverImageSrc = res.url;
  console.log("e3", res, res.url);
  fileList.value = [
    {
      ...fileList.value,
      status: "done",
      url: res.url,
    },
  ];
  return;
};

watch(form.value, (newVal) => {
  localStorage.setItem("caogao", newVal.content);
});
// onBeforeUnmount(() => {
//     localStorage.setItem('caogao',value.value)
// })

onMounted(() => {
  form.value.content = localStorage.getItem("caogao") || "";
});
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
