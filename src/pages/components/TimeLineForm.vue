<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    wrap-class-name="full-modal"
    :footer="null"
  >
    <a-form :model="form" name="basic" autocomplete="on">
      <a-form-item
        label="标题"
        name="title"
        :rules="[{ required: true, message: '请输入标题！' }]"
      >
        <a-input v-model:value="form.title" />
      </a-form-item>

      <a-form-item
        label="内容"
        name="content"
        :rules="[{ required: true, message: '请输入内容！' }]"
      >
        <a-input v-model:value="form.content" />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          @click="save"
          >保存</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import useTimeLineForm from "@/modules/timeLine/useTimeLineForm";
import { andThen, pipe } from "ramda";
import { inject } from "vue";


const { title, form, save, visible, loading } = inject(
  "timeLineForm",
  () => useTimeLineForm(),
  true
);

</script>

<style scoped></style>
