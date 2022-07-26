<template>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    class="form-x"
  >
    <a-form-item
      label="标题"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="摘要"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item label="封面" name="password">
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        @drop="handleDrop"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </a-upload-dragger>
    </a-form-item>

    <a-form-item name="remember">
      <MdEditor class="editor-x" v-model="value" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import EasyMDE from "easymde";
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const fileList = ref([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>("");

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file: UploadProps["fileList"][number]) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const element = ref(null);
const value = ref("");

watch(value, (newVal) => {
  localStorage.setItem("caogao", newVal);
});
// onBeforeUnmount(() => {
//     localStorage.setItem('caogao',value.value)
// })

onMounted(() => {
  value.value = localStorage.getItem("caogao") || "";
  if (!element.value) return;

  const easyMDE = new EasyMDE({
    // toolbar: ["bold", "italic", "heading", "|", "quote"],
    element: element.value,
  });
});

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
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
</style>
