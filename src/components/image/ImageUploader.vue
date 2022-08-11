<template>

  <div class="image-uploader-x">
    <input
      class="image-input-file"
      :value="value"
      type="file"
      @change="onChangeFile"
      accept=".png,.jpeg"
    />
    <div class="image-x" v-if="image?.src">
      <a-image
        height="100%"
        width="100%"
        class="image-uploader-image"
        :src="image.src"
        alt=""
      />
      <close-circle-filled class="operation" @click="remove" />
    </div>
    <div class="image-x" v-else-if="base64Url">
      <img class="image-uploader-image" :src="base64Url" />
      <a-spin class="loading" v-if="loading" tip="上传中"></a-spin>
      <div class="loading-mask"></div>
    </div>

    <div v-else class="image-uploader-image default-box">
      <camera-outlined style="font-size: 20px; margin-bottom: 10px" />
      <p>上传图片</p>
      <a-button class="paste-image" @click.stop="onPasteImage">点击此处粘贴图片</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useToast from "@/modules/toast/useToast.js";
import {
  emptyImage,
  useImageUploader,
  type ProjectImage,
} from "@/modules/upload/useImageUploader";
import { CameraOutlined, CloseCircleFilled } from "@ant-design/icons-vue";

import { ref, watch, type Ref } from "vue";

const props = defineProps<{
  modelValue: ProjectImage | undefined;
}>();
const emit = defineEmits(["update:modelValue"]);

const { loading, upload, image } = useImageUploader();

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal && image.value) {
      emit("update:modelValue", image.value);
      return;
    }
    image.value = newVal || null;
  },
  {
    immediate: true,
  }
);

const emptyFile = new File([], "");

function getBase64(img: Blob) {
  const reader = new FileReader();
  return new Promise((resolve: (url: string) => void, reject) => {
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => resolve(reader.result as string));
  });
}

/**
 * 为了触发删除，还是需要绑定value的。
 */
const value = ref("");

// 待重构 改用computed更合理些
const base64Url = ref("");
watch(
  () => image.value?.src,
  () => {
    emit("update:modelValue", image);
  }
);

const file: Ref<File> = ref(emptyFile);

const remove = () => {
  file.value = emptyFile;
  base64Url.value = "";
  value.value = "";
  image.value = null;
};

const onChangeFile = async (e: any) => {
  const files = e.target.files as File[];
  file.value = files[0];
  loading.value = true;
  base64Url.value = await getBase64(file.value);
  await upload(file.value);
};


const toast = useToast()
const onPasteImage = async () => {
  const blobs = [];
  const clipboardItems = await navigator.clipboard.read();
  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      if (!type.toLocaleLowerCase().startsWith("image")) return;
      blobs.push(await clipboardItem.getType(type));
    }
  }
  if (!blobs.length) {
    toast.error('未在剪贴板发现图片！')
    return;
  }
  const blob = blobs[0];
  
  const randomFileName = (mimeType: string) =>
    Math.random() + mimeType.split("/")[1].toLocaleLowerCase();
  file.value = new File([blob], randomFileName(blob.type));
  loading.value = true;
  base64Url.value = await getBase64(file.value);
  await upload(file.value);
  // const files = e.clipboardData.files || []
  // file.value = files[0];
  // loading.value=true
  // base64Url.value = await getBase64(file.value);
  // await upload(file.value)
};
</script>

<style scoped lang="scss">
.image-uploader-x {
  width: 100px;
  height: 100px;
  position: relative;
}

.image-input-file {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.image-x {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loading-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.image-uploader-image {
  // width: 100%;
  height: 100%;
  object-fit: contain;
  text-align: center;

  &.default-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #999;
    border-style: dashed;
    border: 1px solid #999;
    padding: 10px;
  }
}

.operation {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 16px;
  color: red;
}

.paste-image{
  position: relative;
  z-index: 100;
}
</style>
