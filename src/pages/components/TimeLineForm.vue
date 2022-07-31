<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    wrap-class-name="full-modal"
    :footer="null"
    
  >
    <a-form @finish="save" :model="form" name="basic" autocomplete="on">


      <a-form-item
        label="内容"
        name="content"
        :rules="[{ required: true, message: '请输入内容！' }]"
         @paste="onPaste"
      >
        <a-textarea v-model:value="form.content" />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          >保存</a-button
        >
      </a-form-item>
    </a-form>

  </a-modal>
</template>

<script setup lang="ts">
import useTimeLineForm from "@/modules/timeLine/useTimeLineForm";
import { inject, onMounted } from "vue";


const log = console.log

const { title, form, save, visible, loading } = inject(
  "timeLineForm",
  () => useTimeLineForm(),
  true
);


const onPaste = (e)=>{
  console.log('e',e);
  console.log('e.clipboardData',e.clipboardData.files);
}


</script>

<style scoped></style>
